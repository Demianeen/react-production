import type { Meta, StoryObj } from '@storybook/react'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { LokiDelayDecorator } from '@/shared/lib/storybook/LokiDelayDecorator'
import { ArticleInfiniteListDeprecated } from './ArticleInfiniteListDeprecated'

export default {
  title: 'widgets/ArticleInfiniteList/ArticleInfiniteList/deprecated',
  component: ArticleInfiniteListDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [LayoutDecorator('fullpage'), LokiDelayDecorator()],
} as Meta<typeof ArticleInfiniteListDeprecated>

type Story = StoryObj<typeof ArticleInfiniteListDeprecated>

export const Primary: Story = {}

export const Loading: Story = {}

export const ArticlesNotFound: Story = {}
