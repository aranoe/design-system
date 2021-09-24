import { TransformedToken, TransformedTokens } from 'style-dictionary';

import { FormatOptions } from './FormatOptions';

export interface GacFormatParams {
  tokens: TransformedTokens | TransformedToken;
  options?: FormatOptions;
  callback?: (GacNodeParams: GacFormatParams) => void;
}
