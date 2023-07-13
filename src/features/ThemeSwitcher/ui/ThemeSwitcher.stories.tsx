import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { ThemeSwitcher } from './ThemeSwitcher'

export default {
  title: 'features/ThemeSwitcher',
  component: ThemeSwitcher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ThemeSwitcher>

type Story = StoryObj<typeof ThemeSwitcher>

const light = {
  decorators: [ThemeDecorator(Theme.LIGHT)],
}

export const LightDeprecated: Story = light
export const LightRedesigned: Story = light

const dark = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const DarkDeprecated: Story = dark
export const DarkRedesigned: Story = dark

const orange = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}

export const OrangeDeprecated: Story = orange
export const OrangeRedesigned: Story = orange
