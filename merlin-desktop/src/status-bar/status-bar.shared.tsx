export interface StatusBarProps {
  errors: number;
  warnings: number;
  info: number;
  line: number;
  column: number;
  indentation: string;
  encoding: string;
  eol: string;
  languageLabel: string;
}
