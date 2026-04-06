import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import net from 'node:net';
import path from 'node:path';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';
import { context } from 'esbuild';

const require = createRequire(import.meta.url);
const electronBinary = require('electron');
const projectRoot = process.cwd();
const viteBin = path.join(projectRoot, 'node_modules', '.bin', 'vite.exe');
const isSmokeTest = process.argv.includes('--smoke-test');

const processes = [];

const getAvailablePort = async (startPort) => {
  for (let port = startPort; port < startPort + 20; port += 1) {
    const isFree = await new Promise((resolve) => {
      const server = net.createServer();
      server.once('error', () => resolve(false));
      server.once('listening', () => {
        server.close(() => resolve(true));
      });
      server.listen(port, '127.0.0.1');
    });

    if (isFree) {
      return port;
    }
  }

  throw new Error(`No available port found starting at ${startPort}.`);
};

const stopAll = () => {
  for (const child of processes) {
    if (!child.killed) {
      child.kill();
    }
  }
};

process.on('SIGINT', () => {
  stopAll();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopAll();
  process.exit(0);
});

const availablePort = await getAvailablePort(5181);
const devServerUrl = `http://127.0.0.1:${availablePort}`;

const rendererServer = spawn(
  viteBin,
  ['--host', '127.0.0.1', '--port', String(availablePort), '--strictPort'],
  {
    cwd: projectRoot,
    stdio: 'inherit',
    env: {
      ...process.env,
      FORKX_RENDERER_ONLY: '1',
    },
  }
);

processes.push(rendererServer);
console.log(`Renderer dev server starting on ${devServerUrl}`);

const mainContext = await context({
  entryPoints: ['electron/main.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'dist-electron/main.js',
  external: ['electron'],
  sourcemap: 'inline',
  tsconfig: 'tsconfig.node.json',
});

const preloadContext = await context({
  entryPoints: ['electron/preload.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'dist-electron/preload.mjs',
  external: ['electron'],
  sourcemap: 'inline',
  tsconfig: 'tsconfig.node.json',
});

await Promise.all([mainContext.watch(), preloadContext.watch()]);

const waitForRenderer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(devServerUrl);
      if (response.ok) {
        return;
      }
    } catch {
      await delay(500);
    }
  }

  throw new Error('Renderer dev server did not start in time.');
};

await waitForRenderer();
console.log(`Renderer dev server ready at ${devServerUrl}`);

const electronProcess = spawn(electronBinary, ['dist-electron/main.js'], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: {
    ...process.env,
    VITE_DEV_SERVER_URL: devServerUrl,
  },
});

processes.push(electronProcess);
console.log('Electron process launched.');

const handleExit = async (code) => {
  await Promise.all([mainContext.dispose(), preloadContext.dispose()]);
  stopAll();
  process.exit(code ?? 0);
};

if (isSmokeTest) {
  await delay(3500);
  console.log('Smoke test completed.');
  await handleExit(0);
}

rendererServer.on('exit', (code) => {
  void handleExit(code);
});

electronProcess.on('exit', (code) => {
  void handleExit(code);
});
