// https://amzn.github.io/style-dictionary/#/api?id=registertransformgroup
import StyleDictionary from "style-dictionary";

export const registerTransformGroups = () => {
  StyleDictionary.registerTransformGroup({
    name: "styleguide",
    transforms: ["attribute/cti", "name/cti/kebab", "size/px", "color/css"],
  });

  StyleDictionary.registerTransformGroup({
    name: "tokens-js",
    transforms: [
      "name/cti/constant",
      "name/component/constant",
      "size/px",
      "color/hex",
    ],
  });

  StyleDictionary.registerTransformGroup({
    name: "tokens-json",
    transforms: ["attribute/cti", "name/cti/kebab", "size/px", "color/css"],
  });

  StyleDictionary.registerTransformGroup({
    name: "tokens-scss",
    // to see the pre-defined "scss" transformation use: console.log(StyleDictionary.transformGroup['scss']);
    transforms: [
      "name/cti/kebab",
      "name/component/kebab",
      "value/px",
      "time/seconds",
      "size/px",
      "color/css",
    ],
  });
};

module.exports = {
  registerTransformGroups,
};
