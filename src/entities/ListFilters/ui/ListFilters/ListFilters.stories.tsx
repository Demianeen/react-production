import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { action } from '@storybook/addon-actions'
import { SortOrder } from 'shared/const/sort'
import { SortField } from 'entities/ListFilters/model/const/sortField'
import { View } from 'entities/ListFilters'
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
} as Meta<typeof ListFilters>

type Story = StoryObj<typeof ListFilters>
export const AllFilters: Story = {
  args: {
    ...sortField,
    ...sortOrder,
    ...view,
    ...search,
  },
}
