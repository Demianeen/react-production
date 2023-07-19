import type { Meta, StoryObj } from '@storybook/react'
import { LokiDelayDecorator } from '@/shared/lib/storybook/LokiDelayDecorator'
import { ArticleRecommendationsList } from './ArticleRecommendationsList'

export default {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [LokiDelayDecorator()],
} as Meta<typeof ArticleRecommendationsList>

type Story = StoryObj<typeof ArticleRecommendationsList>
export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
