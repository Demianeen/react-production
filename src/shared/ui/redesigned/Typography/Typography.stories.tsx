import type { StoryObj, Meta } from '@storybook/react'
import { Typography } from './Typography'

export default {
  title: 'shared/redesigned/Typography',
  component: Typography,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Typography',
  },
} as Meta<typeof Typography>

type Story = StoryObj<typeof Typography>

export const Primary: Story = {
  args: {},
}

export const Icon: Story = {
  args: {
    variant: 'icon',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
  },
}
