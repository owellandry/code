import type {
  EditorLanguage,
  FileIconType,
  FileNode,
  StatusBase,
  TabRecord,
  WorkspaceFileRecord,
  WorkspaceTab,
} from './workspace-types';

const FILE_LANGUAGE_LABELS: Record<EditorLanguage, string> = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  json: 'JSON',
  markdown: 'Markdown',
  plaintext: 'Plain Text',
};

export const getFileExtension = (fileName: string) => {
  const parts = fileName.split('.');
  return parts.length > 1 ? parts.at(-1)?.toLowerCase() ?? '' : '';
};

export const getFileIconType = (fileName: string, type: 'file' | 'folder'): FileIconType => {
  if (type === 'folder') {
    return 'folder';
  }

  const extension = getFileExtension(fileName);

  switch (extension) {
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'js':
      return 'js';
    case 'ts':
    case 'tsx':
      return 'ts';
    case 'json':
      return 'json';
    case 'md':
      return 'md';
    default:
      return 'default';
  }
};

export const getEditorLanguage = (fileName: string): EditorLanguage => {
  const extension = getFileExtension(fileName);

  switch (extension) {
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'js':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    default:
      return 'plaintext';
  }
};

export const getLanguageLabel = (language: EditorLanguage) => FILE_LANGUAGE_LABELS[language];

export const createStatusBase = (fileName: string, info = 0): StatusBase => ({
  errors: 0,
  warnings: 0,
  info,
  indentation: 'Spaces: 2',
  encoding: 'UTF-8',
  eol: 'CRLF',
  languageLabel: getLanguageLabel(getEditorLanguage(fileName)),
});

export const findFirstFileId = (records: WorkspaceFileRecord[]) =>
  records
    .filter((record) => record.type === 'file')
    .sort((left, right) => left.sortOrder - right.sortOrder)[0]?.id ?? '';

export const buildFileTree = (records: WorkspaceFileRecord[]): FileNode[] => {
  const childrenByParent = new Map<string | null, WorkspaceFileRecord[]>();

  for (const record of records) {
    const bucket = childrenByParent.get(record.parentId) ?? [];
    bucket.push(record);
    childrenByParent.set(record.parentId, bucket);
  }

  const buildNode = (record: WorkspaceFileRecord): FileNode => {
    const children = (childrenByParent.get(record.id) ?? [])
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map(buildNode);

    return {
      id: record.id,
      name: record.name,
      type: record.type,
      iconType: getFileIconType(record.name, record.type),
      isOpen: record.type === 'folder' ? record.isOpen : undefined,
      children: record.type === 'folder' ? children : undefined,
    };
  };

  return (childrenByParent.get(null) ?? [])
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map(buildNode);
};

export const buildTabs = (
  records: WorkspaceFileRecord[],
  tabs: TabRecord[],
  activeFileId: string
): WorkspaceTab[] => {
  const fileById = new Map(records.map((record) => [record.id, record]));

  return tabs
    .slice()
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((tab) => {
      const file = fileById.get(tab.fileId);

      if (!file) {
        return null;
      }

      return {
        id: file.id,
        name: file.name,
        iconType: getFileIconType(file.name, file.type),
        isActive: file.id === activeFileId,
      };
    })
    .filter((tab): tab is WorkspaceTab => tab !== null);
};

export const getNextActiveFileId = (
  openTabIds: string[],
  closingId: string,
  activeFileId: string,
  fallbackFileId: string
) => {
  if (activeFileId !== closingId) {
    return activeFileId;
  }

  const closingIndex = openTabIds.indexOf(closingId);

  if (closingIndex === -1) {
    return fallbackFileId;
  }

  return openTabIds[closingIndex + 1] ?? openTabIds[closingIndex - 1] ?? fallbackFileId;
};
