import { useAppContext } from '../app/app.context';

export const useTitleBarLogic = () => {
  const { workspace, windowState, minimizeWindow, toggleMaximizeWindow, closeWindow } = useAppContext();

  return {
    title: workspace.appTitle,
    workspaceName: workspace.workspaceName,
    collaborators: workspace.collaborators,
    isMaximized: windowState.isMaximized,
    onMinimize: minimizeWindow,
    onToggleMaximize: toggleMaximizeWindow,
    onClose: closeWindow,
  };
};
