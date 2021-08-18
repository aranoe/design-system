import "./button.css";

import { getBemClasses } from "../../../utils/bem";

export const BUTTON_CHOICES = Object.freeze({
  VARIANT: ["primary", "secondary"] as const,
  SIZE: ["small", "medium", "large"] as const,
});

export type ChoicesButtonVariant = typeof BUTTON_CHOICES.VARIANT[number];
export type ChoicesButtonSize = typeof BUTTON_CHOICES.SIZE[number];

export interface ButtonProps {
  variant?: ChoicesButtonVariant;
  size?: ChoicesButtonSize;
  label: string;
}

export const buttonDefaultProps: ButtonProps = {
  variant: "primary",
  size: "medium",
  label: "",
};

export const createButton = (props: ButtonProps) => {
  const { variant, size, label } = { ...buttonDefaultProps, ...props };

  const classes = getBemClasses("storybook-button", { variant, size });

  return `<button class="${classes}">${label}</button>`;
};
