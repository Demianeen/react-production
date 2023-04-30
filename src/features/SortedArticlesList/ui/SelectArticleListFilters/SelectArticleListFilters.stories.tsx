import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { SelectArticleListFilters } from './SelectArticleListFilters'

export default {
  title:
    'features/SortedArticleList/SelectArticleListFilters',
  component: SelectArticleListFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SelectArticleListFilters>

const Template: ComponentStory<
  typeof SelectArticleListFilters
> = (args) => <SelectArticleListFilters {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
