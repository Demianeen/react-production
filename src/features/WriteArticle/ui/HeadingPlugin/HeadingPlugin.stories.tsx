import type { StoryObj, Meta } from '@storybook/react'
import { HeadingPlugin } from './HeadingPlugin'

export default {
  title: 'features/WriteArticle/HeadingPlugin',
  component: HeadingPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof HeadingPlugin>

type Story = StoryObj<typeof HeadingPlugin>

export const Primary: Story = {
  args: {},
}
