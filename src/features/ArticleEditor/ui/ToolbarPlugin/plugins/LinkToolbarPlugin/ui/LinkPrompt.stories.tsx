import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { LinkPrompt } from './LinkPrompt'

export default {
  title: 'features/ArticleEditor/LinkPrompt',
  component: LinkPrompt,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    isOpen: true,
  },
  parameters: {},
  decorators: [StoreDecorator()],
} as Meta<typeof LinkPrompt>

type Story = StoryObj<typeof LinkPrompt>

export const LightRedesigned: Story = {}
export const LightDeprecated: Story = {}
