import { platforms } from "@/config/extensions/platforms";
import { ConfigParams } from "@/types/Config";
import { Config } from "style-dictionary";

export const getConfig = (config: ConfigParams): Config => {
  return {
    source: [
      `src/tokens/brands/${config.brand}/*.json`,
      `src/tokens/alias/**/*.json`,
      `src/tokens/globals/**/*.json`,
      `src/tokens/platforms/${config.platform}/**/*.json`,
    ],
    platforms: {
      ...platforms.web.cssScssCategories(config),
      ...platforms.web.cssScssComponents(config),
      ...platforms.web.css(config),
      ...platforms.web.scss(config),
      ...platforms.web.js(config),
      ...platforms.web.json(config),
      ...platforms.web.styleguide(config),
      ...platforms.web.mediaQueryMixins(config),
    } as any, // TODO: Define type, StyleDictionary doesn't provide types for all use cases
  };
};
