import assert from 'node:assert/strict';
import {
  buildFileTree,
  buildTabs,
  createStatusBase,
  findFirstFileId,
  getEditorLanguage,
  getFileExtension,
  getFileIconType,
  getLanguageLabel,
  getNextActiveFileId,
} from '../src/core/workspace-utils.ts';
import type { TabRecord, WorkspaceFileRecord } from '../src/core/workspace-types.ts';

const FILES: WorkspaceFileRecord[] = [
  {
    id: 'root',
    parentId: null,
    name: 'merlinDev',
    type: 'folder',
    sortOrder: 0,
    isOpen: true,
    content: null,
  },
  {
    id: 'scripts',
    parentId: 'root',
    name: 'JavaScripts',
    type: 'folder',
    sortOrder: 10,
    isOpen: true,
    content: null,
  },
  {
    id: 'index-js',
    parentId: 'scripts',
    name: 'index.js',
    type: 'file',
    sortOrder: 20,
    isOpen: false,
    content: 'console.log("ok");',
  },
  {
    id: 'theme-css',
    parentId: 'root',
    name: 'theme.css',
    type: 'file',
    sortOrder: 30,
    isOpen: false,
    content: 'body {}',
  },
];

const testCases: Array<{ name: string; run: () => void }> = [
  {
    name: 'buildFileTree preserves hierarchy and icon metadata',
    run: () => {
      const tree = buildFileTree(FILES);

      assert.equal(tree.length, 1);
      assert.equal(tree[0]?.name, 'merlinDev');
      assert.equal(tree[0]?.children?.[0]?.name, 'JavaScripts');
      assert.equal(tree[0]?.children?.[0]?.children?.[0]?.iconType, 'js');
      assert.equal(tree[0]?.children?.[1]?.iconType, 'css');
    },
  },
  {
    name: 'buildTabs maps ordered tabs to active state',
    run: () => {
      const tabs: TabRecord[] = [
        { fileId: 'theme-css', sortOrder: 20 },
        { fileId: 'index-js', sortOrder: 10 },
      ];

      const result = buildTabs(FILES, tabs, 'theme-css');

      assert.deepEqual(
        result.map((tab) => ({ id: tab.id, isActive: tab.isActive })),
        [
          { id: 'index-js', isActive: false },
          { id: 'theme-css', isActive: true },
        ]
      );
    },
  },
  {
    name: 'getNextActiveFileId chooses the right neighbor when available',
    run: () => {
      const next = getNextActiveFileId(['a', 'b', 'c'], 'b', 'b', 'fallback');
      assert.equal(next, 'c');
    },
  },
  {
    name: 'findFirstFileId returns the first file by sort order',
    run: () => {
      assert.equal(findFirstFileId(FILES), 'index-js');
    },
  },
  {
    name: 'getFileExtension reads the last extension segment',
    run: () => {
      assert.equal(getFileExtension('archive.component.tsx'), 'tsx');
    },
  },
  {
    name: 'getFileIconType maps folders and known file types',
    run: () => {
      assert.equal(getFileIconType('src', 'folder'), 'folder');
      assert.equal(getFileIconType('index.html', 'file'), 'html');
      assert.equal(getFileIconType('notes.md', 'file'), 'md');
    },
  },
  {
    name: 'getEditorLanguage and labels stay in sync',
    run: () => {
      const language = getEditorLanguage('plugin.js');
      assert.equal(language, 'javascript');
      assert.equal(getLanguageLabel(language), 'JavaScript');
    },
  },
  {
    name: 'createStatusBase returns deterministic editor metadata',
    run: () => {
      const status = createStatusBase('theme.css', 3);

      assert.deepEqual(status, {
        errors: 0,
        warnings: 0,
        info: 3,
        indentation: 'Spaces: 2',
        encoding: 'UTF-8',
        eol: 'CRLF',
        languageLabel: 'CSS',
      });
    },
  },
];

for (const testCase of testCases) {
  testCase.run();
  console.log(`PASS ${testCase.name}`);
}

console.log(`Completed ${testCases.length} test cases.`);
