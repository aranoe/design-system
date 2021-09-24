import { PLATFORM } from '@/config/constants/platforms';
import { fileHeader } from '@/config/extensions/fileHeader';
import { filter } from '@/config/extensions/filter';
import { PlatformConfig } from '@/types/Config';
import { Platform } from 'style-dictionary/types/Platform';

const variableFormat = "css"; // "css" | "scss"
const outputReferences = true; // if true uses reference of other token instead of raw value

export const web: PlatformConfig = {
  utilities: ({ brand, prefix }) => {
    return {
      [PLATFORM.WEB_UTILITIES]: {
        transformGroup: "tokens-scss",
        buildPath: `dist/web/${brand}/`,
        files: [
          {
            destination: "utilities/utilities.scss",
            format: "scss/utilities",
          },
        ],
        prefix,
      },
    };
  },
  mediaQueryMixins: ({ brand, prefix }) => {
    return {
      [PLATFORM.WEB_MEDIA_QUERY_MIXINS]: {
        transformGroup: "tokens-scss",
        buildPath: `dist/web/${brand}/`,
        files: [
          {
            destination: "mixins/media-queries.scss",
            format: "scss/media-query-mixins",
            filter: filter.category("breakpoint"),
          },
        ],
        prefix,
      },
    };
  },
  cssScssComponents: ({ platform, components, prefix }) => {
    return {
      [PLATFORM.WEB_CSS_SCSS_COMPONENTS]: {
        transformGroup: "tokens-scss",
        buildPath: `dist/${platform}/components/`,
        files: [
          ...components
            .map((component) => [
              {
                destination: `scss/${component}.scss`,
                format: "scss/component",
                filter: filter.component(component),
                options: {
                  component,
                  format: variableFormat,
                  outputReferences,
                },
              },
            ])
            .flat(),
        ],
        prefix,
      },
    };
  },

  cssScssCategories: ({ platform, categories, prefix }): Platform => {
    return {
      [PLATFORM.WEB_CSS_SCSS_CATEGORIES]: {
        transformGroup: "tokens-scss",
        buildPath: `dist/${platform}/globals/`,
        files: [
          ...categories
            .map((category) => [
              {
                destination: `css/${category}.css`,
                format: "css/variables",
                filter: filter.category(category),
                options: {
                  fileHeader: fileHeader.storybookDesignToken(category),
                  outputReferences,
                },
              },
              {
                destination: `scss/css-variables/${category}.scss`,
                format: "css/variables",
                filter: filter.category(category),
                options: {
                  fileHeader: fileHeader.storybookDesignToken(category),
                  outputReferences,
                },
              },
              {
                destination: `scss/scss-variables/${category}.scss`,
                format: "scss/variables-extended",
                filter: filter.category(category),
                options: {
                  fileHeader: fileHeader.storybookDesignToken(category),
                  // "normal" is actually no option, but passed here to not use default "short"
                  // This will generate block comments for multiline comments (/**/) instead of singel line (//)
                  commentStyle: "normal",
                  outputReferences: true,
                },
              },
            ])
            .flat(),
        ],
        prefix,
      },
    };
  },

  js: ({ brand, prefix }) => {
    return {
      [PLATFORM.WEB_JS]: {
        transformGroup: "tokens-js",
        buildPath: `dist/web/${brand}/`,

        files: [
          {
            destination: "tokens.esm.js",
            format: "javascript/es6",
            filter: filter.notComponent(),
          },
        ],
        prefix,
      },
    };
  },

  json: ({ brand, prefix }) => {
    return {
      [PLATFORM.WEB_JSON]: {
        transformGroup: "tokens-json",
        buildPath: `dist/web/${brand}/`,
        files: [
          {
            destination: "tokens.json",
            format: "json/flat",
          },
        ],
        prefix,
      },
    };
  },

  css: ({ brand, prefix }) => {
    return {
      [PLATFORM.WEB_CSS]: {
        transformGroup: "css",
        buildPath: `dist/web/${brand}/`,
        files: [
          {
            destination: "tokens.css",
            format: "css/variables",
            options: {
              outputReferences,
            },
          },
        ],
        prefix,
      },
    };
  },

  scss: ({ brand, prefix }) => {
    return {
      [PLATFORM.WEB_SCSS]: {
        transformGroup: "tokens-scss",
        buildPath: `dist/web/${brand}/`,
        files: [
          {
            destination: "tokens.scss",
            format: "scss/variables",
            filter: filter.notComponent(),
            options: {
              outputReferences,
            },
          },
          {
            destination: "tokens-css-variables.scss",
            filter: filter.notComponent(),
            format: "css/variables",
            options: {
              outputReferences,
            },
          },
        ],
        prefix,
      },
    };
  },

  styleguide: ({ brand, platform, prefix }) => {
    return {
      [PLATFORM.STYLEGUIDE]: {
        transformGroup: "styleguide",
        buildPath: `dist/styleguide/`,
        files: [
          {
            destination: `${platform}_${brand}.json`,
            format: "json/flat",
          },
          {
            destination: `${platform}_${brand}.scss`,
            format: `${variableFormat}/variables`,
            options: {
              outputReferences,
            },
          },
        ],
        prefix,
      },
    };
  },
};
