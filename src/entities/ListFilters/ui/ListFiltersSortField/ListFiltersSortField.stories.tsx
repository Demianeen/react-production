import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SortField } from '../../model/const/sortField'
import { ListFiltersSortField } from './ListFiltersSortField'

export default {
  title: 'entities/ListFilters/ListFiltersSortField',
  component: ListFiltersSortField,
  argTypes: {
    backgroundColor: { control: 'color' },
  },

  args: {
    sortField: SortField.CREATED_AT,
    onChangeSortField: action('onChangeSortField'),
  },
} as Meta<typeof ListFiltersSortField>

type Story = StoryObj<typeof ListFiltersSortField>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
