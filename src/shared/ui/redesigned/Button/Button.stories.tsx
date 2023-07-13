import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import ArrowDownIcon from '@/shared/assets/icons/redesigned/arrow-down.svg'
import { Icon } from '../Icon'
import { Button } from './Button'

export default {
  title: 'shared/redesigned/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Text',
    type: 'button',
  },
} as Meta<typeof Button>

type Template = StoryObj<typeof Button>

export const Primary: Template = {}

export const Clear: Template = {
  args: {
    variant: 'clear',
  },
}

export const Filled: Template = {
  args: {
    variant: 'filled',
  },
}

export const Outline: Template = {
  args: {
    variant: 'outline',
  },
}

export const WithAddons: Template = {
  args: {
    addonLeft: <Icon Svg={ArrowDownIcon} />,
    addonRight: <Icon Svg={ArrowDownIcon} />,
  },
}

export const Disabled: Template = {
  args: {
    disabled: true,
  },
}

export const Dark: Template = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Template = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
