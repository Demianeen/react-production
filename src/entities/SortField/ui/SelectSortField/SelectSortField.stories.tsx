import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SortField } from '../../model/const/sortField'
import { SelectSortField } from './SelectSortField'

export default {
  title: 'entities/SortField/SelectSortField',
  component: SelectSortField,
  argTypes: {
    backgroundColor: { control: 'color' },
  },

  args: {
    sortField: SortField.CREATED_AT,
    onChangeSortField: action('onChangeSortField'),
  },
} as Meta<typeof SelectSortField>

type Story = StoryObj<typeof SelectSortField>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
