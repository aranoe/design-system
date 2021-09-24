import { FormatOptions } from '@/types/format/FormatOptions';
import { GacFormatParams } from '@/types/format/GacFormat';
import { TransformedToken, TransformedTokens } from 'style-dictionary';

export const getCssProp = (prop: string) => {
  switch (prop) {
    case "text-color":
      return "color";
    default:
      return prop;
  }
};

export const isCssPseudo = (state: string) => {
  const cssPseudos = ["hover", "focus", "active", "disabled", "visited"];
  return cssPseudos.includes(state);
};

export const tryTransformToCssPseudo = (state: string) => {
  switch (state) {
    case "pressed":
      return "active";
    case "focused":
      return "focus";
    default:
      return state;
  }
};

export const formatVariable = (name: string, options?: FormatOptions) => {
  const { format } = options ?? { format: "css", outputReferences: true };
  switch (format) {
    case "css":
      return `var(--${name})`;
    case "scss":
      return `$${name}`;
    default:
      throw new Error(
        `Variable De format '${format}' is not supported. Available formats are: css, scss`
      );
  }
};

export const formatVariableDeclaration = (
  { name, value }: TransformedToken,
  { format }: FormatOptions
) => {
  switch (format) {
    case "css":
      return `--${name}: ${value};`;
    case "scss":
      return `$${name}: ${value};`;
    default:
      throw new Error(
        `Variable declaration format '${format}' is not supported. Available formats are: css, scss`
      );
  }
};

export const formatCssStatement = (
  prop: string,
  token: TransformedToken,
  options?: FormatOptions
) => {
  const cssProp = getCssProp(prop);

  return `${cssProp}: ${formatVariable(token.name, options)};`;
};

export const formatCssClass = (className: string, content: string) => {
  return `.${className}{ ${content}}`;
};

export const formatStateTokens = (
  state: string,
  gacTokensParams: GacFormatParams
): string => {
  const maybePseudo = tryTransformToCssPseudo(state);

  // if not pseudo, treat as variant tokens => BEM Notation
  return isCssPseudo(maybePseudo)
    ? formatPseudoStateTokens(maybePseudo, gacTokensParams)
    : formatVariantTokens(state, gacTokensParams);
};

export const formatPseudoStateTokens = (
  state: string,
  params: GacFormatParams
): string => {
  return `&:${state} {${params.callback?.(params)}}`;
};

export const formatVariantTokens = (
  variant: string,
  params: GacFormatParams
): string => {
  return `&--${variant} {${params.callback?.(params)}}`;
};

// expects breakpoint (e.g. tablet, desktop) to exist as SCSS-mixin
export const formatBreakpointTokens = (
  breakpoint: string,
  params: GacFormatParams
): string => {
  return `@include ${breakpoint} {${params.callback?.(params)}}`;
};

export const formatSubcomponentTokens = (
  subcomponent: string,
  params: GacFormatParams
): string => {
  return `&__${subcomponent} {${params.callback?.(params)}}`;
};

export const tokensToString = (
  tokens: TransformedTokens,
  formatFn: (entry: [name: string, token: TransformedTokens]) => string
) => {
  if (!tokens) return "";
  return Object.entries(tokens).map(formatFn).join("");
};
