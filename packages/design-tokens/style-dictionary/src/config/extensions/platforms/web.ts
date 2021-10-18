import { PLATFORM } from '@/config/constants/platforms';
import { fileHeader } from '@/config/extensions/fileHeader';
import { filter } from '@/config/extensions/filter';
import { PlatformConfig } from '@/types/Config';
import { Platform } from 'style-dictionary/types/Platform';

const variableFormat = "css"; // "css" | "scss"
const outputReferences = true; // if true uses reference of other token instead of raw value

export const web: PlatformConfig = {
  [PLATFORM.WEB_UTILITIES]: ({ brand, prefix }) => ({
    transformGroup: "tokens-scss",
    buildPath: `dist/web/${brand}/`,
    files: [
      {
        destination: "utilities/utilities.scss",
        format: "scss/utilities",
      },
    ],
    prefix,
  }),
  [PLATFORM.WEB_MEDIA_QUERY_MIXINS]: ({ brand, prefix }) => ({
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
  }),
  [PLATFORM.WEB_CSS_SCSS_COMPONENTS]: ({ platform, components, prefix }) => ({
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
  }),

  [PLATFORM.WEB_CSS_SCSS_CATEGORIES]: ({
    platform,
    categories,
    prefix,
  }): Platform => ({
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
  }),

  [PLATFORM.WEB_JS]: ({ brand, prefix }) => ({
    transformGroup: "tokens-js",
    buildPath: `dist/web/${brand}/`,

    files: [
      {
        destination: "tokens.js",
        format: "javascript/es6",
        filter: filter.notComponent(),
      },
    ],
    prefix,
  }),

  [PLATFORM.WEB_JSON]: ({ brand, prefix }) => ({
    transformGroup: "tokens-json",
    buildPath: `dist/web/${brand}/`,
    files: [
      {
        destination: "tokens.json",
        format: "json/flat",
      },
    ],
    prefix,
  }),

  [PLATFORM.WEB_CSS]: ({ brand, prefix }) => ({
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
  }),

  [PLATFORM.WEB_SCSS]: ({ brand, prefix }) => ({
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
  }),

  [PLATFORM.STYLEGUIDE]: ({ brand, platform, prefix }) => ({
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
  }),
};
