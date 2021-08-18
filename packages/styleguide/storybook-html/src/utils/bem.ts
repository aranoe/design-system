export type BemState = string | boolean | undefined;

export interface BemClassesParams {
  component: string;
  states?: Record<string, BemState>;
}

export const getBemState = (component: string, state: BemState) =>
  `${component}--${state}`;

export const getBemModifier = (key: string, value: BemState) => {
  switch (typeof value) {
    case "string":
      return value;
    case "boolean":
      return value ? key : "";
    default:
      return "";
  }
};

export const getBemClasses = (
  component: string,
  states: Record<string, BemState>
): string => {
  return [
    component,
    ...Object.entries(states).map(([state, value]) => {
      const modifier = getBemModifier(state, value);
      return getBemState(component, modifier);
    }),
  ].join(" ");
};
