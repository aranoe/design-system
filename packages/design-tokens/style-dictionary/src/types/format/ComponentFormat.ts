import { Dictionary, Platform, TransformedToken } from "style-dictionary";

export type VariableFormat = "css" | "scss";

export interface ComponentNodeOptions {
  format: VariableFormat;
  outputReferences: boolean;
}

interface _ComponentNode {
  subcomponent?: ComponentNode;
  breakpoint?: ComponentNode;
  variant?: ComponentNode;
  state?: ComponentNode;
}

export type ComponentNode = _ComponentNode & {
  [key: string]: TransformedToken;
};

export interface ComponentStylesOptions extends ComponentNodeOptions {
  component: string;
}
export interface ComponentStylesParams {
  dictionary: Dictionary;
  platform: Platform;
  options: ComponentStylesOptions;
}
