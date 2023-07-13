import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { Search } from './Search'

export default {
  title: 'shared/deprecated/Search',
  component: Search,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Search>

type Story = StoryObj<typeof Search>
export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
