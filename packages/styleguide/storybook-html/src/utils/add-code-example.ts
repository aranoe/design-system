export const addCodeExample = <T>(
  component: any, // Story<T>,
  template: any //(props: T) => string
) => {
  if (!component || !template) return;
  component.parameters = {
    docs: {
      source: {
        code: template({ ...component.args }),
      },
    },
  };
  return component;
};
