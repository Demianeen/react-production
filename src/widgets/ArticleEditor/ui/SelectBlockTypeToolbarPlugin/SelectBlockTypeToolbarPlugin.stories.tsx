import type { StoryObj, Meta } from '@storybook/react'
import { SelectBlockTypeToolbarPlugin } from './SelectBlockTypeToolbarPlugin'

export default {
  title: 'widgets/ArticleEditor/SelectBlockTypeToolbarPlugin',
  component: SelectBlockTypeToolbarPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof SelectBlockTypeToolbarPlugin>

type Story = StoryObj<typeof SelectBlockTypeToolbarPlugin>

export const Primary: Story = {
  args: {},
}
