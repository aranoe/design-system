import { Dictionary, Platform, TransformedToken } from 'style-dictionary';

import { FormatOptions } from './FormatOptions';

interface _ComponentTokens {
  subcomponent?: ComponentTokens;
  breakpoint?: ComponentTokens;
  variant?: ComponentTokens;
  state?: ComponentTokens;
}

export type ComponentTokens = _ComponentTokens & {
  [key: string]: TransformedToken;
};

export interface ComponentStylesOptions extends FormatOptions {
  component: string;
}
export interface ComponentStylesParams {
  dictionary: Dictionary;
  platform: Platform;
  options: ComponentStylesOptions;
}
