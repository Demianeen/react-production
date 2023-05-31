import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { SortOrder } from '@/shared/const/sort'
import { View } from '../..'
import { SortField } from '../../model/const/sortField'
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
