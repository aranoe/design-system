import { filter } from '@/config/extensions/filter';
import prettier from 'prettier';
import { Dictionary } from 'style-dictionary';
import { TransformedToken } from 'style-dictionary/types/TransformedToken';

import { formatCssClass, formatCssStatement } from './format-helpers';

const formatTypographyClasses = (dictionary: Dictionary) => {
  const { breakpoint, ...tokens } = dictionary.tokens["typography"];

  return `${Object.entries(tokens)
    .map(([name, tokens]) => {
      return formatCssClass(
        "ty-" + name,
        Object.entries(tokens)
          .map(([prop, token]) =>
            formatCssStatement(prop, token as any, {
              format: "css",
              outputReferences: false,
            })
          )
          .join("")
      );
    })
    .join("")}

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
  return prettier.format(
    `
  ${formatSpacingUtilities(dictionary)}
  ${formatTypographyClasses(dictionary)}
  `,
    {
      parser: "scss",
    }
  );
};
