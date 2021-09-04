import { ComponentNodeOptions } from '@/types/format/ComponentFormat';
import { TransformedToken } from 'style-dictionary';

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

export const formatVariable = (
  name: string,
  { format }: ComponentNodeOptions
) => {
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
  { format }: ComponentNodeOptions
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
  opts: ComponentNodeOptions
) => {
  const cssProp = getCssProp(prop);

  return `${cssProp}: ${formatVariable(token.name, opts)};`;
};
export const formatCssClass = (className: string, content: string) => {
  return `.${className}{ ${content}}`;
};
