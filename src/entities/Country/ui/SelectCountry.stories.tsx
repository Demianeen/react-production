import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { SelectCountry } from './SelectCountry'

export default {
  title: 'entities/SelectCountry',
  component: SelectCountry,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SelectCountry>

const Template: ComponentStory<typeof SelectCountry> = (
  args
) => <SelectCountry {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
