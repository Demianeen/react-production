import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import React from 'react'
import { Counter } from 'entities/Counter'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'

export default {
  title: 'entities/Counter',
  component: Counter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
} as ComponentMeta<typeof Counter>

const Template: ComponentStory<typeof Counter> = () => (
  <Counter />
)

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
