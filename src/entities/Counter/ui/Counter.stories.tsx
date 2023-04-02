import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import React from 'react'
import { Counter } from 'entities/Counter'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

export default {
  title: 'entities/Counter',
  component: Counter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Counter>

const Template: ComponentStory<typeof Counter> = (
  _args
) => <Counter />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
