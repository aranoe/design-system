import { getPrefix } from "@/config/helper/getPrefix";
import { getSimplifiedComponentPath } from "@/config/helper/web/getSimpliefiedComponentPath";
import { constantCase, paramCase } from "change-case";
import StyleDictionary from "style-dictionary";

// https://amzn.github.io/style-dictionary/#/api?id=registertransformgroup
export const registerTransforms = () => {
  StyleDictionary.registerTransform({
    name: "name/component/constant",
    type: "name", // options: "attribute", "name", "value"
    matcher: (token) => {
      return token.filePath.includes("components");
    },
    transformer: (token, platform) => {
      const simplifiedPath = getSimplifiedComponentPath(token.path);
      const prefix = getPrefix(platform);

      return constantCase(prefix + simplifiedPath.join("-")); // WERK_BUTTON_PRIMARY_HOVER_TEXT_COLOR
    },
  });

  StyleDictionary.registerTransform({
    name: "name/component/kebab",
    type: "name",
    matcher: (token) => {
      return token.filePath.includes("components");
    },
    transformer: (token, platform) => {
      const simplifiedPath = getSimplifiedComponentPath(token.path);
      const prefix = getPrefix(platform);

      // somehow kebab-case is called param-case
      return paramCase(prefix + simplifiedPath.join("-")).toLowerCase(); // werk-button-primary-hover-text-color
    },
  });

  StyleDictionary.registerTransform({
    name: "value/px",
    type: "value",
    matcher: (token) => {
      return !isNaN(Number(token.original.value));
    },
    transformer: (token) => {
      return token.original.value + "px"; // werk-button-primary-hover-text-color
    },
  });
};
