import type { Meta, StoryObj } from '@storybook/react'
import { LokiDelayDecorator } from '@/shared/lib/storybook/LokiDelayDecorator'
import { ArticleDetailsPageFooter } from './ArticleDetailsPageFooter'

export default {
  title: 'pages/ArticleDetailsPage/ArticleDetailsPageFooter',
  component: ArticleDetailsPageFooter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [LokiDelayDecorator()],
} as Meta<typeof ArticleDetailsPageFooter>

type Story = StoryObj<typeof ArticleDetailsPageFooter>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
