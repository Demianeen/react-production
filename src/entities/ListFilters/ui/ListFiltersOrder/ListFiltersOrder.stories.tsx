import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { SortOrder } from 'shared/const/sort'
import { action } from '@storybook/addon-actions'
import { ListFiltersOrder } from './ListFiltersOrder'

export default {
  title: 'entities/ListFilters/ListFiltersOrder',
  component: ListFiltersOrder,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    order: SortOrder.DESC,
    onChangeOrder: action('onChangeOrder'),
  },
} as Meta<typeof ListFiltersOrder>

type Story = StoryObj<typeof ListFiltersOrder>
export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
