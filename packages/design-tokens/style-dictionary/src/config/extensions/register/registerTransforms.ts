import { getPrefix } from '@/config/helper/getPrefix';
import { getSimplifiedTokenPath } from '@/config/helper/getSimplifiedTokenPath';
import { transformUnitValue } from '@/config/helper/web/transform/transformUnitValue';
import { constantCase, paramCase } from 'change-case';
import StyleDictionary from 'style-dictionary';

// https://amzn.github.io/style-dictionary/#/api?id=registertransformgroup
export const registerTransforms = () => {
  StyleDictionary.registerTransform({
    name: "attribute/gac",
    type: "attribute", // options: "attribute", "name", "value"
    transformer: (token) => {
      return {
        isGlobal: token.filePath.includes("globals"),
        isAlias: token.filePath.includes("alias"),
        isComponent: token.filePath.includes("components"),
      };
    },
  });

  StyleDictionary.registerTransform({
    name: "name/gac/constant",
    type: "name", // options: "attribute", "name", "value"
    transformer: (token, platform) => {
      const simplifiedPath = getSimplifiedTokenPath(token.path);
      const prefix = getPrefix(platform);

      return constantCase(prefix + "-" + simplifiedPath.join("-")); // WERK_BUTTON_PRIMARY_HOVER_TEXT_COLOR
    },
  });

  StyleDictionary.registerTransform({
    name: "name/gac/kebab",
    type: "name",
    transformer: (token, platform) => {
      const simplifiedPath = getSimplifiedTokenPath(token.path);
      const prefix = getPrefix(platform);

      // somehow kebab-case is called param-case
      return paramCase(prefix + "-" + simplifiedPath.join("-")).toLowerCase(); // werk-button-primary-hover-text-color
    },
  });

  StyleDictionary.registerTransform({
    name: "value/unit",
    type: "value",
    transformer: (token) => {
      return transformUnitValue(token.value, token.unit);
    },
  });
};
