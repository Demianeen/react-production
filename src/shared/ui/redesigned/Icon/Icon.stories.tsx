import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { action } from '@storybook/addon-actions'
import ThemeIcon from '@/shared/assets/icons/redesigned/theme.svg'
import { Icon } from './Icon'

export default {
  title: 'shared/redesigned/Icon',
  component: Icon,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    Svg: ThemeIcon,
  },
} as Meta<typeof Icon>

type Story = StoryObj<typeof Icon>

export const NotClickable: Story = {
  args: {
    onClick: undefined,
  },
}

export const Clickable: Story = {
  args: {
    onClick: action('clicked'),
  },
}

export const Error: Story = {
  args: {
    color: 'error',
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
