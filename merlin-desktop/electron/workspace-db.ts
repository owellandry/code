import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import {
  buildFileTree,
  buildTabs,
  createStatusBase,
  findFirstFileId,
  getEditorLanguage,
  getNextActiveFileId,
} from '../src/core/workspace-utils';
import type {
  Collaborator,
  TabRecord,
  WorkspaceFileRecord,
  WorkspaceSnapshot,
} from '../src/core/workspace-types';

type FileRow = {
  id: string;
  parent_id: string | null;
  name: string;
  type: 'file' | 'folder';
  sort_order: number;
  is_open: number;
  content: string | null;
};

type TabRow = {
  file_id: string;
  sort_order: number;
};

type CollaboratorRow = Collaborator & {
  sort_order: number;
};

type CountRow = {
  total: number;
};

const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ForkX</title>
    <link rel="stylesheet" href="/build.css">
  </head>
  <body>
    <main>
      <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
        <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512">
        <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
          <blockquote>
            <p class="text-lg font-medium">
              "ForkX keeps the editor layout sharp, fast, and ready for real collaboration."
            </p>
          </blockquote>
          <figcaption class="font-medium">
            <div class="text-sky-500 dark:text-sky-400">
              Sarah Dayan
            </div>
            <div class="text-slate-700 dark:text-slate-500">
              Staff Engineer, Algolia
            </div>
          </figcaption>
        </div>
      </figure>
    </main>
  </body>
</html>`;

const CSS_TEMPLATE = `:root {
  --bg-surface: #111214;
  --bg-panel: #17181a;
  --text-main: #f3f4f6;
  --text-muted: #9ca3af;
  --accent: #2563eb;
}

body {
  background: var(--bg-surface);
  color: var(--text-main);
  font-family: "Segoe UI", sans-serif;
}`;

const JS_TEMPLATE = `export function createPlugin() {
  return {
    name: 'forkx-plugin',
    version: '0.1.0',
  };
}
`;

const FILE_SEED = [
  ['root', null, 'merlinDev', 'folder', null, 1, 0],
  ['images', 'root', 'Images', 'folder', null, 0, 10],
  ['scripts', 'root', 'JavaScripts', 'folder', null, 1, 20],
  ['nested-scripts', 'scripts', 'JavaScripts', 'folder', null, 0, 10],
  ['index-js', 'scripts', 'index.js', 'file', JS_TEMPLATE, 0, 20],
  ['dat-gui', 'scripts', 'dat.gui.min.js', 'file', '// external dependency placeholder', 0, 30],
  ['main-script', 'scripts', 'main-script.js', 'file', 'console.log("ForkX ready");', 0, 40],
  ['plugin-js', 'scripts', 'plugin.js', 'file', JS_TEMPLATE, 0, 50],
  ['css', 'root', 'Css', 'folder', null, 1, 30],
  ['theme-css', 'css', 'theme.css', 'file', CSS_TEMPLATE, 0, 10],
  ['merlinbuild-css', 'css', 'merlinbuild.css', 'file', CSS_TEMPLATE, 0, 20],
  ['ecommerce', 'root', 'Ecommerce-Product', 'folder', null, 0, 40],
  ['sql', 'root', 'Sql', 'folder', null, 1, 50],
  ['index-html', 'sql', 'index.html', 'file', HTML_TEMPLATE, 0, 10],
  ['doctype-html', 'sql', 'doctype.html', 'file', '<!DOCTYPE html>', 0, 20],
  ['sample', 'root', 'Sample', 'folder', null, 0, 60],
  ['codepen', 'root', 'Codepen projects', 'folder', null, 0, 70],
  ['note', 'root', 'Note-module', 'folder', null, 0, 80],
] as const;

const TAB_SEED = [
  ['index-html', 10],
  ['merlinbuild-css', 20],
  ['plugin-js', 30],
] as const;

const COLLABORATOR_SEED = [
  ['andrea', 'Andrea Vega', 'AV', '#64748b', 10],
  ['mauro', 'Mauro Ruiz', 'MR', '#2563eb', 20],
  ['nina', 'Nina Chen', 'NC', '#8b5cf6', 30],
] as const;

export class WorkspaceDatabase {
  private readonly database: DatabaseSync;

  constructor(databasePath: string) {
    mkdirSync(path.dirname(databasePath), { recursive: true });
    this.database = new DatabaseSync(databasePath);
    this.initialize();
  }

  getSnapshot(): WorkspaceSnapshot {
    const files = this.getFileRecords();
    const tabs = this.getTabRecords();
    const collaborators = this.getCollaborators();
    const fallbackFileId = findFirstFileId(files);

    let activeFileId = this.getSetting('activeFileId') ?? fallbackFileId;
    if (!files.some((file) => file.id === activeFileId)) {
      activeFileId = fallbackFileId;
      this.setSetting('activeFileId', activeFileId);
    }

    const activeFile = files.find((file) => file.id === activeFileId && file.type === 'file')
      ?? files.find((file) => file.type === 'file');

    const activeFileName = activeFile?.name ?? 'untitled.txt';

    return {
      appTitle: this.getSetting('appTitle') ?? 'ForkX',
      workspaceName: this.getSetting('workspaceName') ?? 'merlinDev',
      files: buildFileTree(files),
      activeFileId: activeFile?.id ?? '',
      activeFileName,
      activeFileContent: activeFile?.content ?? '',
      language: getEditorLanguage(activeFileName),
      activeTabs: buildTabs(files, tabs, activeFile?.id ?? ''),
      status: createStatusBase(activeFileName, tabs.length),
      collaborators,
    };
  }

  selectFile(fileId: string) {
    const file = this.getFileRecords().find((entry) => entry.id === fileId && entry.type === 'file');
    if (!file) {
      return this.getSnapshot();
    }

    const existingTab = this.database
      .prepare('SELECT file_id FROM tabs WHERE file_id = ?')
      .get(fileId) as { file_id?: string } | undefined;

    if (!existingTab) {
      this.database
        .prepare('INSERT INTO tabs (file_id, sort_order) VALUES (?, ?)')
        .run(fileId, this.getNextTabOrder());
    }

    this.setSetting('activeFileId', fileId);
    return this.getSnapshot();
  }

  toggleFolder(folderId: string) {
    const current = this.database
      .prepare('SELECT is_open FROM files WHERE id = ? AND type = ?')
      .get(folderId, 'folder') as { is_open?: number } | undefined;

    if (!current) {
      return this.getSnapshot();
    }

    this.database.prepare('UPDATE files SET is_open = ? WHERE id = ?').run(current.is_open ? 0 : 1, folderId);
    return this.getSnapshot();
  }

  closeTab(fileId: string) {
    const openTabIds = this.getTabRecords().map((tab) => tab.fileId);
    const files = this.getFileRecords();
    const fallbackFileId = findFirstFileId(files);
    const activeFileId = this.getSetting('activeFileId') ?? fallbackFileId;

    this.database.prepare('DELETE FROM tabs WHERE file_id = ?').run(fileId);

    let nextActiveFileId = getNextActiveFileId(openTabIds, fileId, activeFileId, fallbackFileId);
    const remainingTabs = this.getTabRecords();

    if (remainingTabs.length === 0 && nextActiveFileId) {
      this.database
        .prepare('INSERT OR REPLACE INTO tabs (file_id, sort_order) VALUES (?, ?)')
        .run(nextActiveFileId, 10);
    } else if (!remainingTabs.some((tab) => tab.fileId === nextActiveFileId)) {
      nextActiveFileId = remainingTabs[0]?.fileId ?? fallbackFileId;
    }

    this.setSetting('activeFileId', nextActiveFileId);
    return this.getSnapshot();
  }

  updateFileContent(fileId: string, content: string) {
    this.database.prepare('UPDATE files SET content = ? WHERE id = ?').run(content, fileId);
    return this.getSnapshot();
  }

  private initialize() {
    this.database.exec(`
      CREATE TABLE IF NOT EXISTS workspace_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS files (
        id TEXT PRIMARY KEY,
        parent_id TEXT,
        name TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('file', 'folder')),
        content TEXT,
        is_open INTEGER NOT NULL DEFAULT 0,
        sort_order INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS tabs (
        file_id TEXT PRIMARY KEY,
        sort_order INTEGER NOT NULL,
        FOREIGN KEY(file_id) REFERENCES files(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS collaborators (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        initials TEXT NOT NULL,
        accent TEXT NOT NULL,
        sort_order INTEGER NOT NULL
      );
    `);

    const settingsCount = this.database
      .prepare('SELECT COUNT(*) as total FROM workspace_settings')
      .get() as CountRow;

    if (settingsCount.total > 0) {
      return;
    }

    this.database.exec('BEGIN');

    try {
      this.setSetting('appTitle', 'ForkX');
      this.setSetting('workspaceName', 'merlinDev');
      this.setSetting('activeFileId', 'index-html');

      const insertFile = this.database.prepare(`
        INSERT INTO files (id, parent_id, name, type, content, is_open, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      for (const [id, parentId, name, type, content, isOpen, sortOrder] of FILE_SEED) {
        insertFile.run(id, parentId, name, type, content, isOpen, sortOrder);
      }

      const insertTab = this.database.prepare('INSERT INTO tabs (file_id, sort_order) VALUES (?, ?)');
      for (const [fileId, sortOrder] of TAB_SEED) {
        insertTab.run(fileId, sortOrder);
      }

      const insertCollaborator = this.database.prepare(`
        INSERT INTO collaborators (id, name, initials, accent, sort_order)
        VALUES (?, ?, ?, ?, ?)
      `);

      for (const [id, name, initials, accent, sortOrder] of COLLABORATOR_SEED) {
        insertCollaborator.run(id, name, initials, accent, sortOrder);
      }

      this.database.exec('COMMIT');
    } catch (error) {
      this.database.exec('ROLLBACK');
      throw error;
    }
  }

  private getFileRecords(): WorkspaceFileRecord[] {
    const rows = this.database
      .prepare('SELECT id, parent_id, name, type, sort_order, is_open, content FROM files ORDER BY sort_order ASC')
      .all() as FileRow[];

    return rows.map((row) => ({
      id: row.id,
      parentId: row.parent_id,
      name: row.name,
      type: row.type,
      sortOrder: row.sort_order,
      isOpen: Boolean(row.is_open),
      content: row.content,
    }));
  }

  private getTabRecords(): TabRecord[] {
    const rows = this.database
      .prepare('SELECT file_id, sort_order FROM tabs ORDER BY sort_order ASC')
      .all() as TabRow[];

    return rows.map((row) => ({
      fileId: row.file_id,
      sortOrder: row.sort_order,
    }));
  }

  private getCollaborators(): Collaborator[] {
    const rows = this.database
      .prepare('SELECT id, name, initials, accent, sort_order FROM collaborators ORDER BY sort_order ASC')
      .all() as CollaboratorRow[];

    return rows.map(({ sort_order: _sortOrder, ...collaborator }) => collaborator);
  }

  private getNextTabOrder() {
    const row = this.database
      .prepare('SELECT MAX(sort_order) as total FROM tabs')
      .get() as { total: number | null };

    return (row.total ?? 0) + 10;
  }

  private getSetting(key: string) {
    const row = this.database
      .prepare('SELECT value FROM workspace_settings WHERE key = ?')
      .get(key) as { value?: string } | undefined;

    return row?.value;
  }

  private setSetting(key: string, value: string) {
    this.database
      .prepare(`
        INSERT INTO workspace_settings (key, value)
        VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
      `)
      .run(key, value);
  }
}
