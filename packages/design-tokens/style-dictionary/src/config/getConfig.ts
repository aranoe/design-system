import { platforms } from '@/config/extensions/platforms';
import { ConfigParams } from '@/types/Config';
import { Config } from 'style-dictionary';

export const getConfig = (config: ConfigParams): Config => {
  return {
    source: [
      `src/tokens/alias/${config.brand}/*.ts`,
      `src/tokens/globals/**/*.ts`,
      `src/tokens/components/${config.platform}/**/*.ts`,
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
      ...platforms.web.utilities(config),
    } as any, // TODO: Define type, StyleDictionary doesn't provide types for all use cases
  };
};
