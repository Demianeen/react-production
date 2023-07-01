import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { SortOrder } from '@/shared/const/sort'
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

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
