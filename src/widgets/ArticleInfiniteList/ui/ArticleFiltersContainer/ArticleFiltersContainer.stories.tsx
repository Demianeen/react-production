import type { StoryObj, Meta } from '@storybook/react'
import { ArticleFiltersContainer } from './ArticleFiltersContainer'

export default {
  title: 'AFiletemplate/ArticleFiltersContainer',
  component: ArticleFiltersContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleFiltersContainer>

type Story = StoryObj<typeof ArticleFiltersContainer>

export const Primary: Story = {
  args: {},
}
