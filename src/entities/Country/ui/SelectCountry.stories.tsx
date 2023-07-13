import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { Country } from '../model/const/country'
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
  decorators: [LayoutDecorator('centered')],
} as Meta<typeof SelectCountry>

type Story = StoryObj<typeof SelectCountry>

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
