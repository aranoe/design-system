import { pascalCase } from "change-case";

export const fileHeader = {
  // required for https://storybook.js.org/addons/storybook-design-token/
  storybookDesignToken: (property: string) => {
    const transformed = pascalCase(property);

    // "@presenter Size | Breakpoint" doesn't exist => use Spacing as presenter
    // Availabe Presenters: https://github.com/UX-and-I/storybook-design-token#available-presenters
    const presenter =
      transformed === "Size" || transformed === "Breakpoint"
        ? "Spacing"
        : transformed;

    return () => [`@tokens ${transformed}`, `@presenter ${presenter}`];
  },
};
