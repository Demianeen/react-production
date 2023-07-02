import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { Button } from './Button'

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
} as Meta<typeof Button>

type Template = StoryObj<typeof Button>

export const Primary: Template = {}

export const Clear: Template = {
  args: {
    variant: 'clear',
  },
}

export const Outline: Template = {
  args: {
    variant: 'outline',
  },
}

export const OutlineSizeL: Template = {
  args: {
    variant: 'outline',
    size: 'l',
  },
}

export const OutlineSizeXL: Template = {
  args: {
    variant: 'outline',
    size: 'xl',
  },
}

export const Square: Template = {
  args: {
    squared: true,
    children: '>',
  },
}

export const SquareSizeL: Template = {
  args: {
    squared: true,
    children: '>',
    size: 'l',
  },
}

export const SquareSizeXL: Template = {
  args: {
    squared: true,
    children: '>',
    size: 'xl',
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
