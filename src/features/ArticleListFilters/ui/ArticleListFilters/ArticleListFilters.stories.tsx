import type { StoryObj, Meta } from '@storybook/react'
import { ToggleDesignDecorator } from '@/shared/lib/storybook/ToggleDesignDecorator'
import { action } from '@storybook/addon-actions'
import { SortOrder } from '@/shared/const/sort'
import { SortField } from '@/entities/ListFilters'
import { ArticleType } from '@/entities/Article'
import { ArticleListFilters } from './ArticleListFilters'

export default {
  title: 'features/ArticleListFilters',
  component: ArticleListFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [ToggleDesignDecorator(true)],
} as Meta<typeof ArticleListFilters>

type Story = StoryObj<typeof ArticleListFilters>

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
  },
}
