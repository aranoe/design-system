import { Matcher } from 'style-dictionary/types/Matcher';

export const filter = {
  category: (_category: string): Matcher => {
    return (token) => {
      return token.path[0] === _category;
    };
  },
  component: (_component: string): Matcher => {
    return (token) => {
      return token.path[0] === _component;
    };
  },
  notComponent: (): Matcher => {
    return (token) => {
      return !token.filePath.includes("components");
    };
  },
  breakpoint: (): Matcher => {
    return (token) => {
      return token.path[0] === "breakpoint";
    };
  },
};
