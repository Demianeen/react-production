import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
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
} as ComponentMeta<typeof SelectCurrency>

const Template: ComponentStory<typeof SelectCurrency> = (
  args
) => <SelectCurrency {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Readonly = Template.bind({})
Readonly.args = {
  readonly: true,
}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
