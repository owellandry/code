import { useEffect, useMemo, useRef, useState } from 'react';
import type { AppContextType } from './app.shared';
import type { StatusInfo, WindowState, WorkspaceSnapshot } from '../core/workspace-types';

const EMPTY_WORKSPACE: WorkspaceSnapshot = {
  appTitle: 'ForkX',
  workspaceName: 'workspace',
  files: [],
  activeFileId: '',
  activeFileName: '',
  activeFileContent: '',
  language: 'plaintext',
  activeTabs: [],
  status: {
    errors: 0,
    warnings: 0,
    info: 0,
    indentation: 'Spaces: 2',
    encoding: 'UTF-8',
    eol: 'CRLF',
    languageLabel: 'Plain Text',
  },
  collaborators: [],
};

const EMPTY_WINDOW_STATE: WindowState = {
  isMaximized: false,
};

const getForkxApi = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return (window as Window & { forkx?: Window['forkx'] }).forkx;
};

export const useAppLogic = (): AppContextType => {
  const [theme] = useState<'dark' | 'light'>('dark');
  const [isReady, setIsReady] = useState(false);
  const [workspace, setWorkspace] = useState<WorkspaceSnapshot>(EMPTY_WORKSPACE);
  const [windowState, setWindowState] = useState<WindowState>(EMPTY_WINDOW_STATE);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const forkx = getForkxApi();

    if (!forkx) {
      setIsReady(true);
      return () => {
        if (saveTimerRef.current) {
          clearTimeout(saveTimerRef.current);
        }
      };
    }

    const load = async () => {
      try {
        const [nextWorkspace, nextWindowState] = await Promise.all([
          forkx.workspace.getSnapshot(),
          forkx.window.getState(),
        ]);

        setWorkspace(nextWorkspace);
        setCursorPosition({ line: 1, column: 1 });
        setWindowState(nextWindowState);
      } finally {
        setIsReady(true);
      }
    };

    void load();

    const dispose = forkx.window.onStateChange((nextState) => {
      setWindowState(nextState);
    });

    return () => {
      dispose();
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  const replaceWorkspace = (nextWorkspace: WorkspaceSnapshot) => {
    setWorkspace(nextWorkspace);
    setCursorPosition({ line: 1, column: 1 });
  };

  const selectFile = async (fileId: string) => {
    const forkx = getForkxApi();
    if (!forkx) {
      return;
    }
    replaceWorkspace(await forkx.workspace.selectFile(fileId));
  };

  const toggleFolder = async (folderId: string) => {
    const forkx = getForkxApi();
    if (!forkx) {
      return;
    }
    setWorkspace(await forkx.workspace.toggleFolder(folderId));
  };

  const closeTab = async (fileId: string) => {
    const forkx = getForkxApi();
    if (!forkx) {
      return;
    }
    replaceWorkspace(await forkx.workspace.closeTab(fileId));
  };

  const updateActiveFileContent = (content: string) => {
    const fileId = workspace.activeFileId;

    setWorkspace((currentWorkspace) => ({
      ...currentWorkspace,
      activeFileContent: content,
    }));

    if (!fileId) {
      return;
    }

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(() => {
      const forkx = getForkxApi();
      if (!forkx) {
        return;
      }
      void forkx.workspace.updateFileContent(fileId, content).then((nextWorkspace) => {
        setWorkspace((currentWorkspace) =>
          currentWorkspace.activeFileId === nextWorkspace.activeFileId
            ? { ...nextWorkspace, activeFileContent: content }
            : nextWorkspace
        );
      });
    }, 180);
  };

  const setCursor = (line: number, column: number) => {
    setCursorPosition({ line, column });
  };

  const minimizeWindow = async () => {
    const forkx = getForkxApi();
    if (!forkx) {
      return;
    }
    setWindowState(await forkx.window.minimize());
  };

  const toggleMaximizeWindow = async () => {
    const forkx = getForkxApi();
    if (!forkx) {
      return;
    }
    setWindowState(await forkx.window.toggleMaximize());
  };

  const closeWindow = async () => {
    const forkx = getForkxApi();
    if (!forkx) {
      return;
    }
    await forkx.window.close();
  };

  const status: StatusInfo = useMemo(
    () => ({
      ...workspace.status,
      line: cursorPosition.line,
      column: cursorPosition.column,
    }),
    [cursorPosition.column, cursorPosition.line, workspace.status]
  );

  return {
    theme,
    isReady,
    workspace,
    windowState,
    status,
    selectFile,
    toggleFolder,
    closeTab,
    updateActiveFileContent,
    setCursorPosition: setCursor,
    minimizeWindow,
    toggleMaximizeWindow,
    closeWindow,
  };
};
