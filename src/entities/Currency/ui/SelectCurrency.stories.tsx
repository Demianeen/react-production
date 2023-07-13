import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { Currency } from '../model/const/currency'
import { SelectCurrency } from './SelectCurrency'

export default {
  title: 'entities/SelectCurrency',
  component: SelectCurrency,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    value: Currency.USD,
    onChange: action('onChange'),
  },
  decorators: [LayoutDecorator('centered')],
} as Meta<typeof SelectCurrency>

type Story = StoryObj<typeof SelectCurrency>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}

const readonlyArgs = {
  readonly: true,
}

export const ReadonlyDeprecated: Story = {
  args: readonlyArgs,
}
export const ReadonlyRedesigned: Story = {
  args: readonlyArgs,
}
