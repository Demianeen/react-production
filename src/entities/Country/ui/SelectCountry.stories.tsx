import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { action } from '@storybook/addon-actions'
import { Country } from 'entities/Country/model/const/country'
import { SelectCountry } from './SelectCountry'

export default {
  title: 'entities/SelectCountry',
  component: SelectCountry,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    value: Country.USA,
    onChange: action('onChange'),
  },
} as Meta<typeof SelectCountry>

type Story = StoryObj<typeof SelectCountry>
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
