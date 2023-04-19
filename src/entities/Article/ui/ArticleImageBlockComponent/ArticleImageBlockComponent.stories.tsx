import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import type { ArticleImageBlock } from '../../model/types/article'
import { ArticleBlockType } from '../../model/types/article'
import { ArticleImageBlockComponent } from './ArticleImageBlockComponent'

const block: ArticleImageBlock = {
  type: ArticleBlockType.IMAGE,
  id: 1,
  src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
}

export default {
  title: 'entities/ArticleImageBlockComponent',
  component: ArticleImageBlockComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { block },
} as ComponentMeta<typeof ArticleImageBlockComponent>

const Template: ComponentStory<
  typeof ArticleImageBlockComponent
> = (args) => <ArticleImageBlockComponent {...args} />

export const WithoutTitle = Template.bind({})
WithoutTitle.args = {}

export const WithTitle = Template.bind({})
WithTitle.args = {
  block: {
    ...block,
    title: 'Title',
  },
}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
