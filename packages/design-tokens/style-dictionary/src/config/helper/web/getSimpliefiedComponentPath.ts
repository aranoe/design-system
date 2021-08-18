// These paths are used to organize the design tokens in a <component>.json.
// But if they are ignored/removed the token is still understand
const ignorableComponentPaths = [
  "subcomponent",
  "breakpoint",
  "variant",
  "state",
];

export const getSimplifiedComponentPath = (path: string[]) =>
  path.filter((p) => !ignorableComponentPaths.includes(p));
