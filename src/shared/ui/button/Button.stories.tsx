import Button from "@/shared/ui/button/Button";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "공통 버튼",
  component: Button,
  args: {
    children: "버튼",
    size: 'large',
    variant: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof Button>

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    variant: 'gray',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithStroke: Story = {
  args: {
    size: 'large',
    variant: 'white',
    stroke: 'large',
  },
};
