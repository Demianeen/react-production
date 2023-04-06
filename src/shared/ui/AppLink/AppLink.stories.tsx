import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import {
  AppLink,
  AppLinkTheme,
} from 'shared/ui/AppLink/AppLink'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'

export default {
  title: 'shared/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
    children: 'Text',
  },
} as ComponentMeta<typeof AppLink>

const Template: ComponentStory<typeof AppLink> = (args) => (
  <AppLink {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}

export const Inverted = Template.bind({})
Inverted.args = {
  theme: AppLinkTheme.INVERTED,
}

export const Red = Template.bind({})
Red.args = {
  theme: AppLinkTheme.RED,
}

export const PrimaryDark = Template.bind({})
PrimaryDark.args = {}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const InvertedDark = Template.bind({})
InvertedDark.args = {
  theme: AppLinkTheme.INVERTED,
}
InvertedDark.decorators = [ThemeDecorator(Theme.DARK)]

export const RedDark = Template.bind({})
RedDark.args = {
  theme: AppLinkTheme.RED,
}
RedDark.decorators = [ThemeDecorator(Theme.DARK)]
