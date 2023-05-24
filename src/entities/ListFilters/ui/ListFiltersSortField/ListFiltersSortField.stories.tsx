import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { SortField } from 'entities/ListFilters/model/const/sortField'
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

type Story = StoryObj<typeof ListFiltersSortField>
export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
