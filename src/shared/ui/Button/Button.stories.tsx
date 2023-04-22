import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Button, ButtonSize, ButtonTheme } from './Button'

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Text',
    type: 'button',
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}

export const Clear = Template.bind({})
Clear.args = {
  theme: ButtonTheme.CLEAR,
}

export const ClearInverted = Template.bind({})
ClearInverted.args = {
  theme: ButtonTheme.CLEAR_INVERTED,
}

export const Outline = Template.bind({})
Outline.args = {
  theme: ButtonTheme.OUTLINE,
}

export const OutlineSizeL = Template.bind({})
OutlineSizeL.args = {
  theme: ButtonTheme.OUTLINE,
  size: ButtonSize.L,
}

export const OutlineSizeXL = Template.bind({})
OutlineSizeXL.args = {
  theme: ButtonTheme.OUTLINE,
  size: ButtonSize.XL,
}

export const Background = Template.bind({})
Background.args = {
  theme: ButtonTheme.BACKGROUND,
}

export const BackgroundInverted = Template.bind({})
BackgroundInverted.args = {
  theme: ButtonTheme.BACKGROUND_INVERTED,
}

export const Square = Template.bind({})
Square.args = {
  square: true,
  theme: ButtonTheme.BACKGROUND_INVERTED,
  children: '>',
}

export const SquareSizeL = Template.bind({})
SquareSizeL.args = {
  square: true,
  theme: ButtonTheme.BACKGROUND_INVERTED,
  children: '>',
  size: ButtonSize.L,
}

export const SquareSizeXL = Template.bind({})
SquareSizeXL.args = {
  square: true,
  theme: ButtonTheme.BACKGROUND_INVERTED,
  children: '>',
  size: ButtonSize.XL,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  theme: ButtonTheme.OUTLINE,
}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
