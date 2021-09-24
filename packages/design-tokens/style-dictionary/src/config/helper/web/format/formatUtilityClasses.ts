import { filter } from '@/config/extensions/filter';
import { GacFormatParams } from '@/types/format/GacFormat';
import prettier from 'prettier';
import { Dictionary } from 'style-dictionary';
import { TransformedToken } from 'style-dictionary/types/TransformedToken';

import { formatBreakpointTokens, formatCssClass, formatCssStatement, tokensToString } from './format-helpers';

const formatTypographyClasses = ({ tokens, options }: GacFormatParams) => {
  const { breakpoint, ...restTokens } = tokens;
  const prefix = "ty";
  const params = { callback: formatTypographyClasses, options };
  return `
  ${tokensToString(restTokens, ([tyName, tyTokens]) =>
    formatCssClass(
      `${prefix}-` + tyName,
      tokensToString(tyTokens, ([prop, token]) =>
        formatCssStatement(prop, token as TransformedToken, options)
      )
    )
  )}
    
    ${tokensToString(breakpoint, ([breakpointName, breakpointTokens]) =>
      formatBreakpointTokens(breakpointName, {
        tokens: breakpointTokens,
        ...params,
      })
    )}

`;
};

const formatUtilityClass = ({
  prefix,
  statements,
  token,
}: {
  prefix: string;
  statements: string[];
  token: TransformedToken;
}): string => {
  return formatCssClass(
    `${prefix}-${token.path[token.path.length - 1]}`,
    statements.map((statement) => `${statement}:${token.value};`).join("")
  );
};

const formatSpacingUtilities = (dictionary: Dictionary) => {
  const spacingTokens = dictionary.allTokens.filter((token) =>
    filter.category("spacing")(token)
  );
  const spacingUtilities = [
    { prefix: "p-all", statements: ["padding"] },
    { prefix: "p-t", statements: ["padding-top"] },
    { prefix: "p-r", statements: ["padding-right"] },
    { prefix: "p-b", statements: ["padding-bottom"] },
    { prefix: "p-l", statements: ["padding-left"] },
    { prefix: "p-x", statements: ["padding-left", "padding-right"] },
    { prefix: "p-y", statements: ["padding-top", "padding-bottom"] },

    { prefix: "m-all", statements: ["margin"] },
    { prefix: "m-t", statements: ["margin-top"] },
    { prefix: "m-r", statements: ["margin-right"] },
    { prefix: "m-b", statements: ["margin-bottom"] },
    { prefix: "m-l", statements: ["margin-left"] },
    { prefix: "m-x", statements: ["margin-left", "margin-right"] },
    { prefix: "m-y", statements: ["margin-top", "margin-bottom"] },
  ];

  return spacingTokens
    .map((token) =>
      spacingUtilities
        .map((util) => {
          return formatUtilityClass({ token, ...util });
        })
        .join("")
    )
    .join("");
};

export const formatUtilityClasses = (dictionary: Dictionary) => {
  const typographyTokens = dictionary.tokens["typography"];
  return prettier.format(
    `${formatSpacingUtilities(dictionary)}
    ${formatTypographyClasses({ tokens: typographyTokens })}`,
    {
      parser: "scss",
    }
  );
};
