import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SortOrder } from '../../model/const/order'
import { SelectOrder } from './SelectOrder'

export default {
  title: 'entities/Order/SelectOrder',
  component: SelectOrder,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    order: SortOrder.DESC,
    onChangeOrder: action('onChangeOrder'),
  },
} as Meta<typeof SelectOrder>

type Story = StoryObj<typeof SelectOrder>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
