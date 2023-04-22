import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { SelectCurrency } from './SelectCurrency'

export default {
  title: 'entities/SelectCurrency',
  component: SelectCurrency,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SelectCurrency>

const Template: ComponentStory<typeof SelectCurrency> = (
  args
) => <SelectCurrency {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
