import { getPrefix } from '@/config/helper/getPrefix';
import { ComponentNode, ComponentNodeOptions, ComponentStylesParams } from '@/types/format/ComponentFormat';
import prettier from 'prettier';
import { TransformedToken } from 'style-dictionary/types/TransformedToken';

import { formatCssStatement, isCssPseudo, tryTransformToCssPseudo } from './format-helpers';

const {
  formattedVariables,
} = require("style-dictionary/lib/common/formatHelpers");

const formatStateNode = (
  state: string,
  node: ComponentNode,
  opts: ComponentNodeOptions
): string => {
  const maybePseudo = tryTransformToCssPseudo(state);

  // if not pseudo, treat as variant node => BEM Notation
  return isCssPseudo(maybePseudo)
    ? formatPseudoStateNode(maybePseudo, node, opts)
    : formatVariantNode(state, node, opts);
};

const formatPseudoStateNode = (
  state: string,
  node: ComponentNode,
  opts: ComponentNodeOptions
): string => {
  return `&:${state} {${formatComponentNode(node, opts)}}`;
};

const formatVariantNode = (
  variant: string,
  node: ComponentNode,
  opts: ComponentNodeOptions
): string => {
  return `&--${variant} {${formatComponentNode(node, opts)}}`;
};

// expects breakpoint (e.g. tablet, desktop) to exist as SCSS-mixin
const formatBreakpointNode = (
  breakpoint: string,
  node: ComponentNode,
  opts: ComponentNodeOptions
): string => {
  return `@include ${breakpoint} {${formatComponentNode(node, opts)}}`;
};

const formatSubcomponentNode = (
  subcomponent: string,
  node: ComponentNode,
  opts: ComponentNodeOptions
): string => {
  return `&__${subcomponent} {${formatComponentNode(node, opts)}}`;
};

const nodeToString = (
  node: ComponentNode,
  formatFn: (
    entry: [name: string, token: TransformedToken | ComponentNode]
  ) => string
) => {
  return Object.entries(node).map(formatFn).join("");
};

/**
 * @param node node of a <component>.json, node can be rootNode (e.g. button), variant, state or subcomponent
 * @param opts options for e.g. formatting
 * @returns {string} SCSS from node recursively
 */
export const formatComponentNode = (
  node: ComponentNode,
  opts: ComponentNodeOptions = { format: "scss", outputReferences: false }
) => {
  const {
    variant = {},
    state = {},
    subcomponent = {},
    breakpoint = {},
    ...tokens
  } = node;

  return `

      ${Object.entries(tokens)
        .map(([prop, token]) => formatCssStatement(prop, token, opts))
        .join("")}
      ${nodeToString(variant, ([variantName, variantNode]) =>
        formatVariantNode(variantName, variantNode, opts)
      )}
      ${nodeToString(state, ([stateName, stateNode]) =>
        formatStateNode(stateName, stateNode, opts)
      )}
      ${nodeToString(breakpoint, ([breakpointName, breakpointNode]) =>
        formatBreakpointNode(breakpointName, breakpointNode, opts)
      )}
      ${nodeToString(subcomponent, ([subcomponentName, subcomponentNode]) =>
        formatSubcomponentNode(subcomponentName, subcomponentNode, opts)
      )}
      `;
};

/**
 * Transforms style-dictionary <component>.json recursively into SCSS following BEM Notation
 * The output can be used for component styles, e.g. button.scss
 *
 */
export const formatComponentStyles = ({
  dictionary,
  platform,
  options,
}: ComponentStylesParams) => {
  // parsed <component>.json
  const rootNode = dictionary.tokens[options.component] as ComponentNode;
  const prefix = getPrefix(platform);

  const opts = { ...options, format: options.format };
  return prettier.format(
    `.${prefix}${options.component} {
        ${formattedVariables({
          dictionary,
          ...opts,
          format: opts.format === "scss" ? "sass" : opts.format,
          outputReferences: opts.outputReferences,
        })}

      ${formatComponentNode(rootNode, opts)}
     }
    `,
    { parser: "scss" }
  );
};
