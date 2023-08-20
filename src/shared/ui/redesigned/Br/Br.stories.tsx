import type { StoryObj, Meta } from '@storybook/react'
import { Br } from './Br'

export default {
  title: 'shared/redesigned/Br',
  component: Br,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Br>

type Story = StoryObj<typeof Br>

export const PrimaryRedesigned: Story = {}
export const PrimaryDeprecated: Story = {}
