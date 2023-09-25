import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { ImagePrompt } from './ImagePrompt'

export default {
  title: 'features/ArticleEditor/ImagePrompt',
  component: ImagePrompt,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    isOpen: true,
  },
  parameters: {},
  decorators: [StoreDecorator()],
} as Meta<typeof ImagePrompt>

type Story = StoryObj<typeof ImagePrompt>

export const LightRedesigned: Story = {}
export const LightDeprecated: Story = {}
