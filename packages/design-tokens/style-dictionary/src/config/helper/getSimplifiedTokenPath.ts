// These paths are used to organize the design tokens
// But if they are removed the token is still understandable
// Therefore they can be ignored to keep names shorter
const ignorablePaths = ["subcomponent", "breakpoint", "variant", "state"];

export const getSimplifiedTokenPath = (path: string[]) =>
  path.filter((p) => !ignorablePaths.includes(p));
