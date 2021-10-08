import { hexToRgb } from '@/helper/hexToRgb';

/**
 * Adds rgb tokens from hex tokens. Rgb tokens are prefixed with "color-rgb", e.g. "color-rgb-primary"
 *
 * @param tokens - Color Tokens with unit === "hex"
 * @returns New Token Object with both hex and rgb tokens
 */
export const withRgb = (tokens: object) => {
  const transformToRgb = (node: Record<string, any>) => {
    Object.entries(node).forEach(([key, curr]) => {
      if (typeof node === "object" && curr.unit === "hex") {
        node[key] = {
          ...node[key],
          unit: "rgb",
          value: hexToRgb(curr.value),
        };
      } else if (typeof node === "object") {
        // recursively traverse
        transformToRgb(curr[key]);
      }
    });
  };
  // clone tokens
  const rgb = JSON.parse(JSON.stringify(tokens));
  transformToRgb(rgb);
  return { ...tokens, rgb };
};
