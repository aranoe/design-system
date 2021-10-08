import { constantCase, paramCase } from 'change-case';

export const caseTransformer = {
  // werk-button-primary-hover-text-color
  toKebab: (text: string) => paramCase(text).toLowerCase(),
  // WERK_BUTTON_PRIMARY_HOVER_TEXT_COLOR
  toConstant: (text: string) => constantCase(text),
};
