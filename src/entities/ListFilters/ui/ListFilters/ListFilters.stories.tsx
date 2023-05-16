import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { action } from '@storybook/addon-actions'
import { SortOrder } from 'shared/types/sort'
import { SortField } from '../../model/types/sortField'
import { View } from '../../model/types/view'
import { ListFilters } from './ListFilters'

const sortField = {
  onChangeSortField: action('onChangeSortField'),
  sortField: SortField.VIEWS,
}

const sortOrder = {
  onChangeOrder: action('onChangeOrder'),
  order: SortOrder.DESC,
}

const view = {
  onChangeView: action('onChangeView'),
  view: View.GRID,
}

const search = {
  onSearch: action('onSearch'),
  onSearchDebounced: action('onSearchDebounced'),
  search: '',
}

export default {
  title: 'entities/ListFilters/ListFilters',
  component: ListFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
} as ComponentMeta<typeof ListFilters>

const Template: ComponentStory<typeof ListFilters> = (
  args
) => <ListFilters {...args} />

export const AllFilters = Template.bind({})
AllFilters.args = {
  ...sortField,
  ...sortOrder,
  ...view,
  ...search,
}
