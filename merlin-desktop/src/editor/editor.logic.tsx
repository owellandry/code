import { useAppContext } from '../app/app.context';

export const useEditorLogic = () => {
  const { workspace, selectFile, closeTab, updateActiveFileContent, setCursorPosition } = useAppContext();

  return {
    code: workspace.activeFileContent,
    language: workspace.language,
    activeTabs: workspace.activeTabs,
    onChange: updateActiveFileContent,
    onTabClick: selectFile,
    onTabClose: closeTab,
    onCursorChange: setCursorPosition,
  };
};
