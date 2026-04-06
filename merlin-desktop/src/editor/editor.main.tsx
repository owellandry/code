import React from 'react';
import { EditorVisual } from './editor.visual';
import { useEditorLogic } from './editor.logic';

export const EditorMain: React.FC = () => {
  const logic = useEditorLogic();
  return <EditorVisual {...logic} />;
};
