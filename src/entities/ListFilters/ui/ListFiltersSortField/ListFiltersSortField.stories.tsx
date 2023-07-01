import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
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
  },
} as Meta<typeof ListFiltersSortField>

type Story = StoryObj<typeof ListFiltersSortField>
export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
