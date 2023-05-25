import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
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

export const Circle: Story = {
  args: {
    width: '7rem',
    height: '7rem',
    borderRadius: '50%',
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const DarkCircle: Story = {
  args: {
    width: '7rem',
    height: '7rem',
    borderRadius: '50%',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}

export const RedCircle: Story = {
  args: {
    width: '7rem',
    height: '7rem',
    borderRadius: '50%',
  },
  decorators: [ThemeDecorator(Theme.RED)],
}
