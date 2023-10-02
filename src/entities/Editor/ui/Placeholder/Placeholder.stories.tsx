import type { StoryObj, Meta } from '@storybook/react'
import { Placeholder } from './Placeholder'

export default {
  title: 'entities/Editor/Placeholder',
  component: Placeholder,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    text: 'Type something...',
  },
} as Meta<typeof Placeholder>

type Story = StoryObj<typeof Placeholder>

export const Primary: Story = {
  args: {},
}
