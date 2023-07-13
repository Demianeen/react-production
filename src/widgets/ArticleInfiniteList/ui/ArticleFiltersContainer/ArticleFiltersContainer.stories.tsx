import type { StoryObj, Meta } from '@storybook/react'
import { ToggleDesignDecorator } from '@/shared/lib/storybook/ToggleDesignDecorator'
import { ArticleFiltersContainer } from './ArticleFiltersContainer'

export default {
  title: 'widgets/ArticleInfiniteList/ArticleFiltersContainer',
  component: ArticleFiltersContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [ToggleDesignDecorator(true)],
} as Meta<typeof ArticleFiltersContainer>

type Story = StoryObj<typeof ArticleFiltersContainer>

export const Primary: Story = {
  args: {},
}
