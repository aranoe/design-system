import { Story } from "@storybook/html";

import { BUTTON_CHOICES, ButtonProps, createButton } from "./Button";

export default {
  title: "Components/Button",
  argTypes: {
    label: { control: "text" },
    variant: {
      control: { type: "select", options: BUTTON_CHOICES.VARIANT },
    },
    size: {
      control: { type: "select", options: BUTTON_CHOICES.SIZE },
    },
    onClick: { action: "onClick" },
  },
};

const Template: Story<ButtonProps> = ({ ...args }) => {
  return createButton({ ...args });
};

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
