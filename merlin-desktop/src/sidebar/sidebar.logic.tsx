import { useAppContext } from '../app/app.context';

export const useSidebarLogic = () => {
  const { workspace, selectFile, toggleFolder } = useAppContext();

  return {
    workspaceName: workspace.workspaceName,
    files: workspace.files,
    activeFileId: workspace.activeFileId,
    onFileClick: selectFile,
    onToggleFolder: toggleFolder,
  };
};
