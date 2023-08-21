import type { StoryObj, Meta } from '@storybook/react'
import { ToggleDesignDecorator } from '@/shared/lib/storybook/ToggleDesignDecorator'
import { action } from '@storybook/addon-actions'
import { SortOrder } from '@/entities/Order'
import { ArticleType } from '@/entities/Article'
import { SortField } from '@/entities/SortField'
import { ArticleListFiltersRedesigned } from './ArticleListFilters'

export default {
  title: 'features/ArticleListFilters/redesigned',
  component: ArticleListFiltersRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [ToggleDesignDecorator(true)],
} as Meta<typeof ArticleListFiltersRedesigned>

type Story = StoryObj<typeof ArticleListFiltersRedesigned>

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
