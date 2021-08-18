import { MediaQuery } from "@/types/format/MediaQueryFormat";
import prettier from "prettier";
import { Dictionary } from "style-dictionary";

export const breakpointVariations = "min";
export const formatMediaQuery = ({ name, token }: MediaQuery) => {
  return `
    @mixin ${name} {
        @media (min-width: $${token.name}) {
            @content;
        }
    }
    `;
};

export const formatMediaQueryOnly = ({ name, token, next }: MediaQuery) => {
  if (!next) return "";
  return `
      @mixin ${name}-only {
          @media (min-width: $${token.name}) 
             and (max-width: $${next.token.name} - 1) {
            @content;
          }
      }
      `;
};
export const formatMediaQueryAndDown = ({ name, next }: MediaQuery) => {
  if (!next) return "";
  return `
        @mixin ${name}-and-down {
            @media (max-width: $${next.token.name} - 1) {
              @content;
            }
        }
        `;
};

export const formatMediaQueryMixins = (dictionary: Dictionary) => {
  const breakpointTokens = dictionary.tokens.breakpoint;
  const mediaQueries = Object.entries(breakpointTokens)
    .map(([name, token]) => ({ name, token }))
    .map(({ name, token }, index, arr) => {
      let prev;
      let next;
      if (index !== 0) prev = arr[index - 1];
      if (index !== arr.length - 1) next = arr[index + 1];
      return { name, token, prev, next };
    });
  return prettier.format(
    `
      ${mediaQueries.map((query) => formatMediaQuery(query)).join("")}
      ${mediaQueries.map((query) => formatMediaQueryOnly(query)).join("")}
      ${mediaQueries.map((query) => formatMediaQueryAndDown(query)).join("")}

    `,
    { parser: "scss" }
  );
};
