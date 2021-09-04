import { PLATFORM } from '@/config/constants/platforms';
import { registerGlobalConfig } from '@/config/extensions/register';
import { getConfig } from '@/config/getConfig';
import { getFileNames } from '@/helper/getFileNames';
import { BrandOption } from '@/types/BrandOption';
import { PlatformOption } from '@/types/PlatformOption';
import { DESIGN_SYSTEM_CONFIG } from '@design-system/config';
import StyleDictionary from 'style-dictionary';

/**
 * The setup is inspired by Adobe, Amazon, Atlassian, Cosmos & DTCG
 *
 * Cosmos Design Token example repo: https://github.com/didoo/style-dictionary-demo
 * blog post: https://didoo.medium.com/how-to-manage-your-design-tokens-with-style-dictionary-98c795b938aa
 * DTCG: https://github.com/design-tokens/community-group
 *
 */
const prefix = DESIGN_SYSTEM_CONFIG.PREFIX;

const platforms: PlatformOption[] = ["web"];
const brands: BrandOption[] = ["sellwerk"];

const build = async () => {
  // register all global style dictionary configurations
  registerGlobalConfig();

  // create styles for each platform and brand
  platforms.map(function (platform) {
    brands.map(function (brand) {
      console.log("\n==============================================");
      console.log(`\nProcessing: [${platform}] [${brand}]`);

      const components = getFileNames(
        `src/tokens/${platform}/components/**/*.json`
      );
      const categories = getFileNames("src/tokens/globals/*.json");

      const config = getConfig({
        brand,
        platform,
        categories,
        components,
        prefix,
      });

      const dictionary = StyleDictionary.extend(config);

      if (platform === "web") {
        // generates all tokens in tokens.js
        dictionary.buildPlatform(PLATFORM.WEB_JS);

        // generates all tokens in tokens.json
        dictionary.buildPlatform(PLATFORM.WEB_JSON);

        // generates all tokens in tokens.scss
        dictionary.buildPlatform(PLATFORM.WEB_SCSS);

        // generates file for each category in css & scss: color, spacing, etc...
        dictionary.buildPlatform(PLATFORM.WEB_CSS_SCSS_CATEGORIES);

        // generates file for each component in scss: button, input, etc...
        dictionary.buildPlatform(PLATFORM.WEB_CSS_SCSS_COMPONENTS);

        // generate file with media query mixins for each breakpoint in scss: mobile, tablet, desktop, etc ...
        dictionary.buildPlatform(PLATFORM.WEB_MEDIA_QUERY_MIXINS);

        // generate file with utility classes for spacing, typograph, etc...
        dictionary.buildPlatform(PLATFORM.WEB_UTILITIES);
      } else if (platform === "ios") {
        // maybe in future
      } else if (platform === "android") {
        // maybe in future
      }

      // CURRENTLY NOT USED - generates generic json for custom styleguides
      dictionary.buildPlatform("styleguide");

      console.log("\nEnd processing");
    });
  });

  console.log("\n==============================================");
  console.log("\nBuild completed!");
};

build();
