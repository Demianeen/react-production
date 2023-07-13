import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ListFiltersViewDeprecated } from './ListFiltersViewDeprecated'

export default {
  title: 'entities/ListFilters/ListFiltersView/deprecated',
  component: ListFiltersViewDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onChangeView: action('onChangeView'),
  },
} as Meta<typeof ListFiltersViewDeprecated>

type Story = StoryObj<typeof ListFiltersViewDeprecated>

export const Primary: Story = {}
