import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { SortOrder } from 'shared/types/sort'
import { action } from '@storybook/addon-actions'
import { ListFiltersOrder } from './ListFiltersOrder'

export default {
  title: 'entities/ListFilters/ListFiltersOrder',
  component: ListFiltersOrder,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    order: SortOrder.DESC,
    onChangeOrder: action('onChangeOrder'),
  },
} as ComponentMeta<typeof ListFiltersOrder>

const Template: ComponentStory<typeof ListFiltersOrder> = (
  args
) => <ListFiltersOrder {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
