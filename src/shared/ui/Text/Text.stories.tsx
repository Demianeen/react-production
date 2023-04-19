import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import {
  Text,
  TextAlign,
  TextSize,
  TextTheme,
} from './Text'

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => (
  <Text {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
  title: 'Title',
  text: 'Text',
}

export const OnlyTitle = Template.bind({})
OnlyTitle.args = {
  title: 'Title',
}

export const OnlyText = Template.bind({})
OnlyText.args = {
  text: 'Text',
}

export const Error = Template.bind({})
Error.args = {
  title: 'Title',
  text: 'Text',
  theme: TextTheme.ERROR,
}

export const AlignCenter = Template.bind({})
AlignCenter.args = {
  title: 'Title',
  text: 'Text',
  align: TextAlign.CENTER,
}

export const AlignRight = Template.bind({})
AlignRight.args = {
  title: 'Title',
  text: 'Text',
  align: TextAlign.RIGHT,
}

export const Large = Template.bind({})
Large.args = {
  title: 'Title',
  text: 'Text',
  size: TextSize.L,
}

export const Dark = Template.bind({})
Dark.args = {
  title: 'Title',
  text: 'Text',
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {
  title: 'Title',
  text: 'Text',
}
Red.decorators = [ThemeDecorator(Theme.RED)]
