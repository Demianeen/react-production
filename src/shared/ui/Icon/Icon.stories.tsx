import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg'
import { Icon } from './Icon'

export default {
  title: 'shared/Icon',
  component: Icon,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    Svg: CalendarIcon,
  },
} as Meta<typeof Icon>

type Story = StoryObj<typeof Icon>

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
