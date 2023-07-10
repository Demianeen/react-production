import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import CalendarIcon from '@/shared/assets/icons/deprecated/calendar-20-20.svg'
import { action } from '@storybook/addon-actions'
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

export const NotClickable: Story = {}

export const Clickable: Story = {
  args: {
    onClick: action('clicked'),
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}