import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg'
import { Icon } from './Icon'

export default {
  title: 'shared/Icon',
  component: Icon,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    Svg: CalendarIcon,
  },
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => (
  <Icon {...args} />
)

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
