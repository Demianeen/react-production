import type { StoryObj, Meta } from '@storybook/react'
import { Title } from './Title'

export default {
  title: 'shared/redesigned/Title',
  component: Title,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Title',
  },
} as Meta<typeof Title>

type Story = StoryObj<typeof Title>

export const Level1: Story = {
  args: {
    level: 1,
  },
}

export const Level2: Story = {
  args: {
    level: 2,
  },
}
