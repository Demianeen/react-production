// template-folder-name -> ArticlesPage.stories.tsx
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import ArticlesPage from './ArticlesPage'

export default {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesPage>

const Template: ComponentStory<typeof ArticlesPage> = (
  args
) => <ArticlesPage {...args} />

export const Normal = Template.bind({})
Normal.args = {}
