import type { Meta, StoryObj } from '@storybook/react'
import { ArticleRecommendationsList } from './ArticleRecommendationsList'

export default {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleRecommendationsList>

type Story = StoryObj<typeof ArticleRecommendationsList>
export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
