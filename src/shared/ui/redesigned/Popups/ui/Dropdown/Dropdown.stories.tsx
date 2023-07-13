import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { Button } from '../../../Button'
import { Dropdown } from './Dropdown'

export default {
  title: 'shared/redesigned/Popups/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    trigger: <Button type='button'>Trigger button</Button>,
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
  decorators: [LayoutDecorator('centered')],
} as Meta<typeof Dropdown>

type Story = StoryObj<typeof Dropdown>
export const Primary: Story = {}

export const DirectionDownRight: Story = {
  args: {
    direction: 'down-right',
  },
}

export const DirectionUpLeft: Story = {
  args: {
    direction: 'up-left',
  },
}

export const DirectionUpRight: Story = {
  args: {
    direction: 'up-right',
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
