import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { Select } from './Select'

export default {
  title: 'shared/redesigned/Popups/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    onChange: action('onChange'),
    defaultValue: 'default value',
  },
  decorators: [LayoutDecorator('centered')],
} as Meta<typeof Select>

type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    label: 'label',
  },
}

export const Multiple: Story = {
  args: {
    label: 'label',
    multiple: true,
    value: ['1', '2'],
  },
}

export const Clear: Story = {
  args: {
    clear: true,
    direction: 'down-right',
  },
}

export const DirectionDownRight: Story = {
  args: {
    label: 'label',
    direction: 'down-right',
  },
}

export const DirectionUpLeft: Story = {
  args: {
    label: 'label',
    direction: 'up-left',
  },
  decorators: [LayoutDecorator('fullpage')],
}

export const DirectionUpRight: Story = {
  args: {
    label: 'label',
    direction: 'up-right',
  },
}

export const WithoutLabel: Story = {}

export const WithSelectedValue: Story = {
  args: {
    value: '2',
  },
}

export const Readonly: Story = {
  args: {
    readonly: true,
  },
}

export const Dark: Story = {
  args: {
    label: 'label',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  args: {
    label: 'label',
  },
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
