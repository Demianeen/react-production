import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { WithLabel } from './WithLabel'

export default {
  title: 'shared/WithLabel',
  component: WithLabel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: <input />,
    label: 'Label',
  },
} as ComponentMeta<typeof WithLabel>

const Template: ComponentStory<typeof WithLabel> = (
  args
) => <WithLabel {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
