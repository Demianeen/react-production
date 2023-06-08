import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { Dropdown } from './Dropdown'

export default {
  title: 'shared/Popups/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    triggerChildren: 'Trigger',
    items: [
      { label: 'Item 1', onClick: action('onClick') },
      {
        label: 'Item 2',
        href: '#',
        onClick: action('onClick'),
      },
      { label: 'Item 3', onClick: action('onClick') },
    ],
  },
} as Meta<typeof Dropdown>

type Story = StoryObj<typeof Dropdown>
export const Light: Story = {}

export const DirectionDownRight: Story = {
  args: {
    direction: 'down-right',
  },
  decorators: [LayoutDecorator('centered')],
}

export const DirectionUpLeft: Story = {
  args: {
    direction: 'up-left',
  },
  decorators: [LayoutDecorator('centered')],
}

export const DirectionUpRight: Story = {
  args: {
    direction: 'up-right',
  },
  decorators: [LayoutDecorator('centered')],
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
