import type { ComponentStory, Meta } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { SortField } from '../../model/types/sortField'
import { ListFiltersSortField } from './ListFiltersSortField'

export default {
  title: 'entities/ListFilters/ListFiltersSortField',
  component: ListFiltersSortField,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
  args: {
    sortField: SortField.CREATED_AT,
  },
} as Meta<typeof ListFiltersSortField>

const Template: ComponentStory<
  typeof ListFiltersSortField
> = (args) => <ListFiltersSortField {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
