import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { Input } from './Input'

export default {
  title: 'shared/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
  },
} as Meta<typeof Input>

type Story = StoryObj<typeof Input>

export const WithPlaceholder: Story = {}

export const WithValue: Story = {
  args: {
    value: 'Value',
  },
}

export const Dark: Story = {
  args: {
    value: 'Value',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  args: {
    value: 'Value',
  },
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
