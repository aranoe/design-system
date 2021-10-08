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
    { prefix: "p", statements: ["padding"] },
    { prefix: "pt", statements: ["padding-top"] },
    { prefix: "pr", statements: ["padding-right"] },
    { prefix: "pb", statements: ["padding-bottom"] },
    { prefix: "pl", statements: ["padding-left"] },
    { prefix: "px", statements: ["padding-left", "padding-right"] },
    { prefix: "py", statements: ["padding-top", "padding-bottom"] },

    { prefix: "m", statements: ["margin"] },
    { prefix: "mt", statements: ["margin-top"] },
    { prefix: "mr", statements: ["margin-right"] },
    { prefix: "mb", statements: ["margin-bottom"] },
    { prefix: "ml", statements: ["margin-left"] },
    { prefix: "mx", statements: ["margin-left", "margin-right"] },
    { prefix: "my", statements: ["margin-top", "margin-bottom"] },
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
