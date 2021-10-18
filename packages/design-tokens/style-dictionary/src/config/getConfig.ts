import { platforms } from '@/config/extensions/platforms';
import { ConfigParams, PlatformConfig } from '@/types/Config';
import { Config, Platform } from 'style-dictionary';

export const getConfig = (config: ConfigParams): Config => {
  const getPlatforms = (platformConfig: PlatformConfig) => {
    return Object.entries(platformConfig).reduce(
      (platforms, [currentPlatform, getPlatform]) => {
        platforms[currentPlatform] = getPlatform(config);
        return platforms;
      },
      {} as Record<string, Platform>
    );
  };

  return {
    source: [
      `src/tokens/alias/${config.brand}/*.ts`,
      `src/tokens/globals/**/*.ts`,
      `src/tokens/components/${config.platform}/**/*.ts`,
    ],
    // register all platforms: web -> future ios, android ...
    platforms: {
      ...getPlatforms(platforms.web),
      // StyleDictionary doesn't provide types for all use cases
    } as Record<string, Platform>,
  };
};
