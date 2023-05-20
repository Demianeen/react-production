import type { ComponentStory, Meta } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { action } from '@storybook/addon-actions'
import { Country } from '../model/types/country'
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

const Template: ComponentStory<typeof SelectCountry> = (
  args
) => <SelectCountry {...args} />

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
