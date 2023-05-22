import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { action } from '@storybook/addon-actions'
import { SelectCurrency } from './SelectCurrency'
import { Currency } from '../model/types/currency'

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
} as Meta<typeof SelectCurrency>

type Story = StoryObj<typeof SelectCurrency>
export const Light: Story = {}

export const Readonly: Story = {
  args: {
    readonly: true,
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
