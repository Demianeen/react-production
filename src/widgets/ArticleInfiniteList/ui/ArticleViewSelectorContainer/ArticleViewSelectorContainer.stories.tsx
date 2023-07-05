import type { StoryObj, Meta } from '@storybook/react'
import { ArticleViewSelectorContainer } from './ArticleViewSelectorContainer'

export default {
  title: 'AFiletemplate/ArticleViewSelectorContainer',
  component: ArticleViewSelectorContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleViewSelectorContainer>

type Story = StoryObj<typeof ArticleViewSelectorContainer>

export const Primary: Story = {
  args: {},
}
