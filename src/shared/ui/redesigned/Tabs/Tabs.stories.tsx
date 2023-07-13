import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import type { TabItem } from './Tabs'
import { Tabs } from './Tabs'

const tabs: TabItem<string>[] = [
  {
    label: 'Tab 1',
    value: 'tab1',
  },
  {
    label: 'Tab 2',
    value: 'tab2',
  },
  {
    label: 'Tab 3',
    value: 'tab3',
  },
]

export default {
  title: 'shared/redesigned/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    tabs,
    value: 'tab2',
    onTabClick: action('onTabClick'),
  },
} as Meta<typeof Tabs>

type Story = StoryObj<typeof Tabs>

export const Primary: Story = {}

export const DirectionColumn: Story = {
  args: {
    direction: 'column',
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
