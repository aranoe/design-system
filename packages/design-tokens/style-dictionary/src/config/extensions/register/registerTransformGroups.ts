import StyleDictionary from 'style-dictionary';

// https://amzn.github.io/style-dictionary/#/api?id=registertransformgroup
export const registerTransformGroups = () => {
  StyleDictionary.registerTransformGroup({
    name: "styleguide",
    transforms: ["attribute/gac", "name/gac/kebab", "value/unit"],
  });

  StyleDictionary.registerTransformGroup({
    name: "tokens-js",
    transforms: ["attribute/gac", "name/gac/constant", "value/unit"],
  });

  StyleDictionary.registerTransformGroup({
    name: "tokens-json",
    transforms: ["attribute/gac", "name/gac/kebab", "value/unit"],
  });

  StyleDictionary.registerTransformGroup({
    name: "tokens-scss",
    // to see the pre-defined "scss" transformation use: console.log(StyleDictionary.transformGroup['scss']);
    transforms: ["attribute/gac", "name/gac/kebab", "value/unit"],
  });
};

module.exports = {
  registerTransformGroups,
};
