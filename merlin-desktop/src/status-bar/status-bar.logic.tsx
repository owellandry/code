import { useAppContext } from '../app/app.context';

export const useStatusBarLogic = () => {
  const { status } = useAppContext();

  return {
    errors: status.errors,
    warnings: status.warnings,
    info: status.info,
    line: status.line,
    column: status.column,
    indentation: status.indentation,
    encoding: status.encoding,
    eol: status.eol,
    languageLabel: status.languageLabel,
  };
};
