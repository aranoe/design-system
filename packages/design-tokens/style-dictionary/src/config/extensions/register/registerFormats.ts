import { formatComponentStyles } from "@/config/helper/web/format/formatComponentStyles";
import { formatMediaQueryMixins } from "@/config/helper/web/format/formatMediaQueryMixins";
import { ComponentStylesOptions } from "@/types/format/ComponentFormat";
import StyleDictionary, { format } from "style-dictionary";

const {
  fileHeader,
  formattedVariables,
} = require("style-dictionary/lib/common/formatHelpers");

// https://amzn.github.io/style-dictionary/#/api?id=registerformat

export const registerFormats = () => {
  StyleDictionary.registerFormat({
    name: "json/flat",
    formatter: function ({ dictionary }) {
      return JSON.stringify(dictionary.allProperties, null, 2);
    },
  });

  // extended version of 'scss/variables': https://github.com/amzn/style-dictionary/blob/main/lib/common/formats.js
  StyleDictionary.registerFormat({
    name: "scss/variables-extended",
    formatter: function ({ dictionary, options, file }) {
      const { outputReferences, commentStyle = "short" } = options;
      return (
        fileHeader({ file, commentStyle }) +
        formattedVariables({ format: "sass", dictionary, outputReferences })
      );
    },
  });

  StyleDictionary.registerFormat({
    name: "scss/component",
    formatter: function ({ dictionary, options, platform }) {
      if (!options.component)
        throw Error(
          `options.component must be defined. Got '${options.component}'.`
        );
      const _options = {
        format: "scss",
        ...options,
      } as ComponentStylesOptions;

      // recursively write scss statements with BEM Notation
      return formatComponentStyles({ dictionary, platform, options: _options });
    },
  });

  StyleDictionary.registerFormat({
    name: "scss/media-query-mixins",
    formatter: function ({ dictionary }) {
      return formatMediaQueryMixins(dictionary);
    },
  });
};
