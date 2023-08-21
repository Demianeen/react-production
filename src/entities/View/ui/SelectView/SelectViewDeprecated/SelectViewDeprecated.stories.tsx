import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SelectViewDeprecated } from './SelectViewDeprecated'

export default {
  title: 'entities/View/SelectView/deprecated',
  component: SelectViewDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onChangeView: action('onChangeView'),
  },
} as Meta<typeof SelectViewDeprecated>

type Story = StoryObj<typeof SelectViewDeprecated>

export const Primary: Story = {}
