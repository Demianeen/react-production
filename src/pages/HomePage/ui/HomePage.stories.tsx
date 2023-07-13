import type { Meta, StoryObj } from '@storybook/react'
import HomePage from './HomePage'

export default {
  title: 'pages/HomePage',
  component: HomePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof HomePage>

type Story = StoryObj<typeof HomePage>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
