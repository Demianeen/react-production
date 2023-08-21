import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SelectViewRedesigned } from './SelectViewRedesigned'

export default {
  title: 'entities/View/SelectView/redesigned',
  component: SelectViewRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onChangeView: action('onChangeView'),
  },
} as Meta<typeof SelectViewRedesigned>

type Story = StoryObj<typeof SelectViewRedesigned>

export const Primary: Story = {}
