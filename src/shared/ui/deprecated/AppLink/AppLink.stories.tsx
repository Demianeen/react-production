import type { Meta, StoryObj } from '@storybook/react'
import { Theme } from '@/shared/const/theme'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { AppLink, AppLinkTheme } from './AppLink'

export default {
  title: 'shared/deprecated/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
    children: 'Text',
  },
} as Meta<typeof AppLink>

type Story = StoryObj<typeof AppLink>

export const Primary: Story = {}

export const Inverted: Story = {
  args: {
    theme: AppLinkTheme.INVERTED,
  },
}

export const Red: Story = {
  args: {
    theme: AppLinkTheme.RED,
  },
}

export const PrimaryDark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const InvertedDark: Story = {
  args: {
    theme: AppLinkTheme.INVERTED,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const RedDark: Story = {
  args: {
    theme: AppLinkTheme.RED,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const PrimaryOrange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}

export const InvertedOrange: Story = {
  args: {
    theme: AppLinkTheme.INVERTED,
  },
  decorators: [ThemeDecorator(Theme.ORANGE)],
}

export const RedOrange: Story = {
  args: {
    theme: AppLinkTheme.RED,
  },
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
