import type { Meta, StoryObj } from '@storybook/react'
import { ToggleDesign } from './ToggleDesign'

export default {
  title: 'features/ToggleDesign',
  component: ToggleDesign,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof ToggleDesign>

type Story = StoryObj<typeof ToggleDesign>

export const Light: Story = {}
