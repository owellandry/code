import { BrowserWindow as e, app as t } from "electron";
import { fileURLToPath as n } from "node:url";
import r from "node:path";
//#region electron/main.ts
var i = r.dirname(n(import.meta.url));
process.env.APP_ROOT = r.join(i, "..");
var a = process.env.VITE_DEV_SERVER_URL, o = r.join(process.env.APP_ROOT, "dist-electron"), s = r.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = a ? r.join(process.env.APP_ROOT, "public") : s;
var c;
function l() {
	c = new e({
		width: 1200,
		height: 800,
		minWidth: 800,
		minHeight: 600,
		titleBarStyle: "hidden",
		trafficLightPosition: {
			x: 15,
			y: 15
		},
		backgroundColor: "#1E1E1E",
		webPreferences: { preload: r.join(i, "preload.js") }
	}), c.webContents.on("did-finish-load", () => {
		c?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
	}), a ? c.loadURL(a) : c.loadFile(r.join(s, "index.html"));
}
t.on("window-all-closed", () => {
	process.platform !== "darwin" && (t.quit(), c = null);
}), t.on("activate", () => {
	e.getAllWindows().length === 0 && l();
}), t.whenReady().then(l);
//#endregion
export { o as MAIN_DIST, s as RENDERER_DIST, a as VITE_DEV_SERVER_URL };
