import type { Meta, StoryObj } from '@storybook/react'
import { Theme } from '@/shared/const/theme'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { AppLink } from './AppLink'

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
} as Meta<typeof AppLink>

type Story = StoryObj<typeof AppLink>

export const Primary: Story = {}

export const DarkPrimary: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const OrangePrimary: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}

export const Cancel: Story = {
  args: {
    variant: 'cancel',
  },
}

export const DarkCancel: Story = {
  args: {
    variant: 'cancel',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const OrangeCancel: Story = {
  args: {
    variant: 'cancel',
  },
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
