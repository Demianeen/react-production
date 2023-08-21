import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SortOrder } from '@/entities/Order'
import { ArticleType } from '@/entities/Article'
import { SortField } from '@/entities/SortField'
import { View } from '@/entities/View'
import { ArticleListFiltersDeprecated } from './ArticleListFilters'

export default {
  title: 'features/ArticleListFilters/deprecated',
  component: ArticleListFiltersDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleListFiltersDeprecated>

type Story = StoryObj<typeof ArticleListFiltersDeprecated>

export const Primary: Story = {
  args: {
    onChangeOrder: action('onChangeOrder'),
    onChangeSortField: action('onChangeSortField'),
    onChangeTab: action('onChangeTab'),
    onSearch: action('onSearch'),
    onSearchDebounced: action('onSearchDebounced'),
    order: SortOrder.DESC,
    sortField: SortField.CREATED_AT,
    tab: ArticleType.ALL,
    onChangeView: action('onChangeView'),
    view: View.LIST,
  },
}
