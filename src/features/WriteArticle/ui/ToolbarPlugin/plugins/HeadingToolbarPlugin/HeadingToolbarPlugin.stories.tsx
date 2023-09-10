import type { StoryObj, Meta } from '@storybook/react'
import { HeadingToolbarPlugin } from './HeadingToolbarPlugin'

export default {
  title: 'features/WriteArticle/HeadingToolbarPlugin',
  component: HeadingToolbarPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof HeadingToolbarPlugin>

type Story = StoryObj<typeof HeadingToolbarPlugin>

export const Primary: Story = {
  args: {},
}
