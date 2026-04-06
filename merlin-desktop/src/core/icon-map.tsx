import type { IconType } from 'react-icons';
import { FaCss3Alt, FaHtml5, FaMarkdown } from 'react-icons/fa';
import { BiCodeAlt, BiCodeBlock } from 'react-icons/bi';
import { BsBezier2 } from 'react-icons/bs';
import { VscFileCode, VscFolder, VscJson } from 'react-icons/vsc';
import type { FileIconType } from './workspace-types';

export const getFileIconComponent = (iconType: FileIconType): IconType => {
  switch (iconType) {
    case 'html':
      return FaHtml5;
    case 'css':
      return FaCss3Alt;
    case 'js':
      return BiCodeAlt;
    case 'ts':
      return BiCodeBlock;
    case 'json':
      return VscJson;
    case 'md':
      return FaMarkdown;
    case 'folder':
      return VscFolder;
    default:
      return VscFileCode;
  }
};

export const getForkxLogoIcon = (): IconType => BsBezier2;
