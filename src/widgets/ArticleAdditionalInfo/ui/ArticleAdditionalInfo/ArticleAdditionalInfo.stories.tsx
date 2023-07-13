import type { Meta, StoryObj } from '@storybook/react'
import { mockArticle } from '@/entities/Article/testing'
import { ToggleDesignDecorator } from '@/shared/lib/storybook/ToggleDesignDecorator'
import { ArticleAdditionalInfo } from './ArticleAdditionalInfo'

export default {
  title: 'widgets/ArticleAdditionalInfo',
  component: ArticleAdditionalInfo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    article: mockArticle,
    id: 1,
  },
  decorators: [ToggleDesignDecorator(true)],
} as Meta<typeof ArticleAdditionalInfo>

type Story = StoryObj<typeof ArticleAdditionalInfo>

export const Light: Story = {}
