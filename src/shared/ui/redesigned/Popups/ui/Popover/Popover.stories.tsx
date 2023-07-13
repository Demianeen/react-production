import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { Button } from '../../../Button'
import { Popover } from './Popover'

export default {
  title: 'shared/redesigned/Popups/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    trigger: <Button type='button'>Trigger button</Button>,

    children: <div>Content</div>,
  },
  decorators: [LayoutDecorator('centered')],
} as Meta<typeof Popover>

type Story = StoryObj<typeof Popover>

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
