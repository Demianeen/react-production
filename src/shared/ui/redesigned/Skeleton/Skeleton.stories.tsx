import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { Skeleton } from './Skeleton'

export default {
  title: 'shared/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    width: '100%',
    height: '13rem',
  },
} as Meta<typeof Skeleton>

type Story = StoryObj<typeof Skeleton>
export const Light: Story = {}

export const Text: Story = {
  args: {
    variant: 'text',
    height: 'text',
  },
}

export const Circle: Story = {
  args: {
    variant: 'circular',
    size: '7rem',
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const DarkCircle: Story = {
  args: {
    variant: 'circular',
    size: '7rem',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}

export const OrangeCircle: Story = {
  args: {
    variant: 'circular',
    size: '7rem',
  },
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
