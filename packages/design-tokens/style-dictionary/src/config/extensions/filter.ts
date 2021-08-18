import { Matcher } from "style-dictionary/types/Matcher";

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
  breakpoint: (): Matcher => {
    return (token) => {
      return token.path[0] === "breakpoint";
    };
  },
};
