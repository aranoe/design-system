import { ComponentStylesParams, ComponentTokens } from '@/types/format/ComponentFormat';
import { GacFormatParams } from '@/types/format/GacFormat';
import { DESIGN_SYSTEM_CONFIG } from '@design-system/config';
import prettier from 'prettier';
import { TransformedToken } from 'style-dictionary';

import {
  formatBreakpointTokens,
  formatCssStatement,
  formatStateTokens,
  formatSubcomponentTokens,
  formatVariantTokens,
  tokensToString,
} from './format-helpers';

const {
  formattedVariables,
} = require("style-dictionary/lib/common/formatHelpers");

/**
 * @param node node of a <component>.json, node can be rootTokens (e.g. button), variant, state or subcomponent
 * @param opts options for e.g. formatting
 * @returns {string} SCSS from node recursively
 */
export const formatComponentTokens = ({
  tokens,
  options = { format: "scss", outputReferences: false },
}: GacFormatParams) => {
  const {
    variant = {},
    state = {},
    subcomponent = {},
    breakpoint = {},
    ...restTokens
  } = tokens;

  const params = { callback: formatComponentTokens, options };

  return `

      ${tokensToString(restTokens, ([prop, token]) =>
        formatCssStatement(prop, token as TransformedToken, options)
      )}
      ${tokensToString(variant, ([variantName, variantTokens]) =>
        formatVariantTokens(variantName, { tokens: variantTokens, ...params })
      )}
      ${tokensToString(state, ([stateName, stateTokens]) =>
        formatStateTokens(stateName, { tokens: stateTokens, ...params })
      )}
      ${tokensToString(breakpoint, ([breakpointName, breakpointTokens]) =>
        formatBreakpointTokens(breakpointName, {
          tokens: breakpointTokens,
          ...params,
        })
      )}
      ${tokensToString(subcomponent, ([subcomponentName, subcomponentTokens]) =>
        formatSubcomponentTokens(subcomponentName, {
          tokens: subcomponentTokens,
          ...params,
        })
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
  const rootTokens = dictionary.tokens[options.component] as ComponentTokens;
  const prefix = DESIGN_SYSTEM_CONFIG.PREFIX;

  const opts = { ...options, format: options.format };
  return prettier.format(
    `.${prefix}${options.component} {
        ${formattedVariables({
          dictionary,
          ...opts,
          format: opts.format === "scss" ? "sass" : opts.format,
          outputReferences: opts.outputReferences,
        })}

      ${formatComponentTokens({ tokens: rootTokens, options: opts })}
     }
    `,
    { parser: "scss" }
  );
};
