import type { Meta, StoryObj } from '@storybook/react'
import { ArticleAdditionalInfo } from './ArticleAdditionalInfo'

export default {
  title: 'widgets/ArticleAdditionalInfo',
  component: ArticleAdditionalInfo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof ArticleAdditionalInfo>

type Story = StoryObj<typeof ArticleAdditionalInfo>

export const Light: Story = {}
