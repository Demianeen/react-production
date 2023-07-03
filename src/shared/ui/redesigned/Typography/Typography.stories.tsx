import type { StoryObj, Meta } from '@storybook/react'
import { Typography } from './Typography'

export default {
  title: 'shared/redesigned/Text',
  component: Typography,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Typography>

type Story = StoryObj<typeof Typography>

export const Primary: Story = {
  args: {},
}
