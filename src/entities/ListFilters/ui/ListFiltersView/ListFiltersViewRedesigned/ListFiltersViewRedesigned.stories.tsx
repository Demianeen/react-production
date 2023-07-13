import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ListFiltersViewRedesigned } from './ListFiltersViewRedesigned'

export default {
  title: 'entities/ListFilters/ListFiltersView/redesigned',
  component: ListFiltersViewRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onChangeView: action('onChangeView'),
  },
} as Meta<typeof ListFiltersViewRedesigned>

type Story = StoryObj<typeof ListFiltersViewRedesigned>

export const Primary: Story = {}
