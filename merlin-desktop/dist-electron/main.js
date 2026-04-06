import e from "electron/main";
import { fileURLToPath as t } from "node:url";
import n from "node:path";
import { mkdirSync as r } from "node:fs";
import { DatabaseSync as i } from "node:sqlite";
//#region src/core/workspace-utils.ts
var a = {
	html: "HTML",
	css: "CSS",
	javascript: "JavaScript",
	typescript: "TypeScript",
	json: "JSON",
	markdown: "Markdown",
	plaintext: "Plain Text"
}, o = (e) => {
	let t = e.split(".");
	return t.length > 1 ? t.at(-1)?.toLowerCase() ?? "" : "";
}, s = (e, t) => {
	if (t === "folder") return "folder";
	switch (o(e)) {
		case "html": return "html";
		case "css": return "css";
		case "js": return "js";
		case "ts":
		case "tsx": return "ts";
		case "json": return "json";
		case "md": return "md";
		default: return "default";
	}
}, c = (e) => {
	switch (o(e)) {
		case "html": return "html";
		case "css": return "css";
		case "js": return "javascript";
		case "ts":
		case "tsx": return "typescript";
		case "json": return "json";
		case "md": return "markdown";
		default: return "plaintext";
	}
}, l = (e) => a[e], u = (e, t = 0) => ({
	errors: 0,
	warnings: 0,
	info: t,
	indentation: "Spaces: 2",
	encoding: "UTF-8",
	eol: "CRLF",
	languageLabel: l(c(e))
}), d = (e) => e.filter((e) => e.type === "file").sort((e, t) => e.sortOrder - t.sortOrder)[0]?.id ?? "", f = (e) => {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = t.get(n.parentId) ?? [];
		e.push(n), t.set(n.parentId, e);
	}
	let n = (e) => {
		let r = (t.get(e.id) ?? []).sort((e, t) => e.sortOrder - t.sortOrder).map(n);
		return {
			id: e.id,
			name: e.name,
			type: e.type,
			iconType: s(e.name, e.type),
			isOpen: e.type === "folder" ? e.isOpen : void 0,
			children: e.type === "folder" ? r : void 0
		};
	};
	return (t.get(null) ?? []).sort((e, t) => e.sortOrder - t.sortOrder).map(n);
}, p = (e, t, n) => {
	let r = new Map(e.map((e) => [e.id, e]));
	return t.slice().sort((e, t) => e.sortOrder - t.sortOrder).map((e) => {
		let t = r.get(e.fileId);
		return t ? {
			id: t.id,
			name: t.name,
			iconType: s(t.name, t.type),
			isActive: t.id === n
		} : null;
	}).filter((e) => e !== null);
}, m = (e, t, n, r) => {
	if (n !== t) return n;
	let i = e.indexOf(t);
	return i === -1 ? r : e[i + 1] ?? e[i - 1] ?? r;
}, h = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>ForkX</title>\n    <link rel=\"stylesheet\" href=\"/build.css\">\n  </head>\n  <body>\n    <main>\n      <figure class=\"md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800\">\n        <img class=\"w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto\" src=\"/sarah-dayan.jpg\" alt=\"\" width=\"384\" height=\"512\">\n        <div class=\"pt-6 md:p-8 text-center md:text-left space-y-4\">\n          <blockquote>\n            <p class=\"text-lg font-medium\">\n              \"ForkX keeps the editor layout sharp, fast, and ready for real collaboration.\"\n            </p>\n          </blockquote>\n          <figcaption class=\"font-medium\">\n            <div class=\"text-sky-500 dark:text-sky-400\">\n              Sarah Dayan\n            </div>\n            <div class=\"text-slate-700 dark:text-slate-500\">\n              Staff Engineer, Algolia\n            </div>\n          </figcaption>\n        </div>\n      </figure>\n    </main>\n  </body>\n</html>", g = ":root {\n  --bg-surface: #111214;\n  --bg-panel: #17181a;\n  --text-main: #f3f4f6;\n  --text-muted: #9ca3af;\n  --accent: #2563eb;\n}\n\nbody {\n  background: var(--bg-surface);\n  color: var(--text-main);\n  font-family: \"Segoe UI\", sans-serif;\n}", _ = "export function createPlugin() {\n  return {\n    name: 'forkx-plugin',\n    version: '0.1.0',\n  };\n}\n", v = [
	[
		"root",
		null,
		"merlinDev",
		"folder",
		null,
		1,
		0
	],
	[
		"images",
		"root",
		"Images",
		"folder",
		null,
		0,
		10
	],
	[
		"scripts",
		"root",
		"JavaScripts",
		"folder",
		null,
		1,
		20
	],
	[
		"nested-scripts",
		"scripts",
		"JavaScripts",
		"folder",
		null,
		0,
		10
	],
	[
		"index-js",
		"scripts",
		"index.js",
		"file",
		_,
		0,
		20
	],
	[
		"dat-gui",
		"scripts",
		"dat.gui.min.js",
		"file",
		"// external dependency placeholder",
		0,
		30
	],
	[
		"main-script",
		"scripts",
		"main-script.js",
		"file",
		"console.log(\"ForkX ready\");",
		0,
		40
	],
	[
		"plugin-js",
		"scripts",
		"plugin.js",
		"file",
		_,
		0,
		50
	],
	[
		"css",
		"root",
		"Css",
		"folder",
		null,
		1,
		30
	],
	[
		"theme-css",
		"css",
		"theme.css",
		"file",
		g,
		0,
		10
	],
	[
		"merlinbuild-css",
		"css",
		"merlinbuild.css",
		"file",
		g,
		0,
		20
	],
	[
		"ecommerce",
		"root",
		"Ecommerce-Product",
		"folder",
		null,
		0,
		40
	],
	[
		"sql",
		"root",
		"Sql",
		"folder",
		null,
		1,
		50
	],
	[
		"index-html",
		"sql",
		"index.html",
		"file",
		h,
		0,
		10
	],
	[
		"doctype-html",
		"sql",
		"doctype.html",
		"file",
		"<!DOCTYPE html>",
		0,
		20
	],
	[
		"sample",
		"root",
		"Sample",
		"folder",
		null,
		0,
		60
	],
	[
		"codepen",
		"root",
		"Codepen projects",
		"folder",
		null,
		0,
		70
	],
	[
		"note",
		"root",
		"Note-module",
		"folder",
		null,
		0,
		80
	]
], y = [
	["index-html", 10],
	["merlinbuild-css", 20],
	["plugin-js", 30]
], b = [
	[
		"andrea",
		"Andrea Vega",
		"AV",
		"#64748b",
		10
	],
	[
		"mauro",
		"Mauro Ruiz",
		"MR",
		"#2563eb",
		20
	],
	[
		"nina",
		"Nina Chen",
		"NC",
		"#8b5cf6",
		30
	]
], x = class {
	database;
	constructor(e) {
		r(n.dirname(e), { recursive: !0 }), this.database = new i(e), this.initialize();
	}
	getSnapshot() {
		let e = this.getFileRecords(), t = this.getTabRecords(), n = this.getCollaborators(), r = d(e), i = this.getSetting("activeFileId") ?? r;
		e.some((e) => e.id === i) || (i = r, this.setSetting("activeFileId", i));
		let a = e.find((e) => e.id === i && e.type === "file") ?? e.find((e) => e.type === "file"), o = a?.name ?? "untitled.txt";
		return {
			appTitle: this.getSetting("appTitle") ?? "ForkX",
			workspaceName: this.getSetting("workspaceName") ?? "merlinDev",
			files: f(e),
			activeFileId: a?.id ?? "",
			activeFileName: o,
			activeFileContent: a?.content ?? "",
			language: c(o),
			activeTabs: p(e, t, a?.id ?? ""),
			status: u(o, t.length),
			collaborators: n
		};
	}
	selectFile(e) {
		return this.getFileRecords().find((t) => t.id === e && t.type === "file") ? (this.database.prepare("SELECT file_id FROM tabs WHERE file_id = ?").get(e) || this.database.prepare("INSERT INTO tabs (file_id, sort_order) VALUES (?, ?)").run(e, this.getNextTabOrder()), this.setSetting("activeFileId", e), this.getSnapshot()) : this.getSnapshot();
	}
	toggleFolder(e) {
		let t = this.database.prepare("SELECT is_open FROM files WHERE id = ? AND type = ?").get(e, "folder");
		return t && this.database.prepare("UPDATE files SET is_open = ? WHERE id = ?").run(t.is_open ? 0 : 1, e), this.getSnapshot();
	}
	closeTab(e) {
		let t = this.getTabRecords().map((e) => e.fileId), n = d(this.getFileRecords()), r = this.getSetting("activeFileId") ?? n;
		this.database.prepare("DELETE FROM tabs WHERE file_id = ?").run(e);
		let i = m(t, e, r, n), a = this.getTabRecords();
		return a.length === 0 && i ? this.database.prepare("INSERT OR REPLACE INTO tabs (file_id, sort_order) VALUES (?, ?)").run(i, 10) : a.some((e) => e.fileId === i) || (i = a[0]?.fileId ?? n), this.setSetting("activeFileId", i), this.getSnapshot();
	}
	updateFileContent(e, t) {
		return this.database.prepare("UPDATE files SET content = ? WHERE id = ?").run(t, e), this.getSnapshot();
	}
	initialize() {
		if (this.database.exec("\n      CREATE TABLE IF NOT EXISTS workspace_settings (\n        key TEXT PRIMARY KEY,\n        value TEXT NOT NULL\n      );\n\n      CREATE TABLE IF NOT EXISTS files (\n        id TEXT PRIMARY KEY,\n        parent_id TEXT,\n        name TEXT NOT NULL,\n        type TEXT NOT NULL CHECK(type IN ('file', 'folder')),\n        content TEXT,\n        is_open INTEGER NOT NULL DEFAULT 0,\n        sort_order INTEGER NOT NULL\n      );\n\n      CREATE TABLE IF NOT EXISTS tabs (\n        file_id TEXT PRIMARY KEY,\n        sort_order INTEGER NOT NULL,\n        FOREIGN KEY(file_id) REFERENCES files(id) ON DELETE CASCADE\n      );\n\n      CREATE TABLE IF NOT EXISTS collaborators (\n        id TEXT PRIMARY KEY,\n        name TEXT NOT NULL,\n        initials TEXT NOT NULL,\n        accent TEXT NOT NULL,\n        sort_order INTEGER NOT NULL\n      );\n    "), !(this.database.prepare("SELECT COUNT(*) as total FROM workspace_settings").get().total > 0)) {
			this.database.exec("BEGIN");
			try {
				this.setSetting("appTitle", "ForkX"), this.setSetting("workspaceName", "merlinDev"), this.setSetting("activeFileId", "index-html");
				let e = this.database.prepare("\n        INSERT INTO files (id, parent_id, name, type, content, is_open, sort_order)\n        VALUES (?, ?, ?, ?, ?, ?, ?)\n      ");
				for (let [t, n, r, i, a, o, s] of v) e.run(t, n, r, i, a, o, s);
				let t = this.database.prepare("INSERT INTO tabs (file_id, sort_order) VALUES (?, ?)");
				for (let [e, n] of y) t.run(e, n);
				let n = this.database.prepare("\n        INSERT INTO collaborators (id, name, initials, accent, sort_order)\n        VALUES (?, ?, ?, ?, ?)\n      ");
				for (let [e, t, r, i, a] of b) n.run(e, t, r, i, a);
				this.database.exec("COMMIT");
			} catch (e) {
				throw this.database.exec("ROLLBACK"), e;
			}
		}
	}
	getFileRecords() {
		return this.database.prepare("SELECT id, parent_id, name, type, sort_order, is_open, content FROM files ORDER BY sort_order ASC").all().map((e) => ({
			id: e.id,
			parentId: e.parent_id,
			name: e.name,
			type: e.type,
			sortOrder: e.sort_order,
			isOpen: !!e.is_open,
			content: e.content
		}));
	}
	getTabRecords() {
		return this.database.prepare("SELECT file_id, sort_order FROM tabs ORDER BY sort_order ASC").all().map((e) => ({
			fileId: e.file_id,
			sortOrder: e.sort_order
		}));
	}
	getCollaborators() {
		return this.database.prepare("SELECT id, name, initials, accent, sort_order FROM collaborators ORDER BY sort_order ASC").all().map(({ sort_order: e, ...t }) => t);
	}
	getNextTabOrder() {
		return (this.database.prepare("SELECT MAX(sort_order) as total FROM tabs").get().total ?? 0) + 10;
	}
	getSetting(e) {
		return this.database.prepare("SELECT value FROM workspace_settings WHERE key = ?").get(e)?.value;
	}
	setSetting(e, t) {
		this.database.prepare("\n        INSERT INTO workspace_settings (key, value)\n        VALUES (?, ?)\n        ON CONFLICT(key) DO UPDATE SET value = excluded.value\n      ").run(e, t);
	}
}, { app: S, BrowserWindow: C, ipcMain: w } = e, T = n.dirname(t(import.meta.url));
process.env.APP_ROOT = n.join(T, "..");
var E = process.env.VITE_DEV_SERVER_URL, D = n.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = E ? n.join(process.env.APP_ROOT, "public") : D;
var O = null, k, A = () => ({ isMaximized: O?.isMaximized() ?? !1 }), j = () => {
	O && O.webContents.send("window:state-changed", A());
}, M = () => {
	for (let e of [
		"window:get-state",
		"window:minimize",
		"window:toggle-maximize",
		"window:close",
		"workspace:get-snapshot",
		"workspace:select-file",
		"workspace:toggle-folder",
		"workspace:close-tab",
		"workspace:update-file-content"
	]) w.removeHandler(e);
	w.handle("window:get-state", () => A()), w.handle("window:minimize", () => (O?.minimize(), A())), w.handle("window:toggle-maximize", () => (O && (O.isMaximized() ? O.unmaximize() : O.maximize()), A())), w.handle("window:close", () => {
		O?.close();
	}), w.handle("workspace:get-snapshot", () => k.getSnapshot()), w.handle("workspace:select-file", (e, t) => k.selectFile(t)), w.handle("workspace:toggle-folder", (e, t) => k.toggleFolder(t)), w.handle("workspace:close-tab", (e, t) => k.closeTab(t)), w.handle("workspace:update-file-content", (e, t, n) => k.updateFileContent(t, n));
};
function N() {
	O = new C({
		width: 1480,
		height: 920,
		minWidth: 1180,
		minHeight: 760,
		frame: !1,
		autoHideMenuBar: !0,
		title: "ForkX",
		backgroundColor: "#111214",
		webPreferences: { preload: n.join(T, "preload.mjs") }
	}), O.on("maximize", j), O.on("unmaximize", j), O.on("enter-full-screen", j), O.on("leave-full-screen", j), O.on("closed", () => {
		O = null;
	}), E ? O.loadURL(E) : O.loadFile(n.join(D, "index.html"));
}
S.on("window-all-closed", () => {
	process.platform !== "darwin" && (S.quit(), O = null);
}), S.on("activate", () => {
	C.getAllWindows().length === 0 && N();
}), S.whenReady().then(() => {
	k = new x(n.join(S.getPath("userData"), "forkx", "workspace.db")), M(), N();
});
//#endregion
export { D as RENDERER_DIST, E as VITE_DEV_SERVER_URL };
