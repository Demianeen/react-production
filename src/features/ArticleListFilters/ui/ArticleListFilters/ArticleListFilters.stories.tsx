import type { StoryObj, Meta } from '@storybook/react'
import { ArticleListFilters } from './ArticleListFilters'

export default {
  title: 'AFiletemplate/ArticleListFilters',
  component: ArticleListFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleListFilters>

type Story = StoryObj<typeof ArticleListFilters>

export const Primary: Story = {
  args: {},
}
