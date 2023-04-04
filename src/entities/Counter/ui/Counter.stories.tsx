import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import React from 'react'
import { Counter } from 'entities/Counter'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'

export default {
  title: 'entities/Counter',
  component: Counter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
} as ComponentMeta<typeof Counter>

const Template: ComponentStory<typeof Counter> = (
  _args
) => <Counter />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
