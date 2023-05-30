import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import {
  Text,
  TextAlign,
  TextSize,
  TextTheme,
} from './Text'

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} as Meta<typeof Text>

type Story = StoryObj<typeof Text>

export const Small: Story = {
  args: {
    title: 'Title',
    text: 'Text',
    size: TextSize.S,
  },
}

export const Medium: Story = {
  args: {
    title: 'Title',
    text: 'Text',
  },
}

export const Large: Story = {
  args: {
    title: 'Title',
    text: 'Text',
    size: TextSize.L,
  },
}

export const OnlyTitle: Story = {
  args: {
    title: 'Title',
  },
}

export const OnlyText: Story = {
  args: {
    text: 'Text',
  },
}

export const Error: Story = {
  args: {
    title: 'Title',
    text: 'Text',
    theme: TextTheme.ERROR,
  },
}

export const Inverted: Story = {
  args: {
    title: 'Title',
    text: 'Text',
    theme: TextTheme.INVERTED,
  },
}

export const AlignCenter: Story = {
  args: {
    title: 'Title',
    text: 'Text',
    align: TextAlign.CENTER,
  },
}

export const AlignRight: Story = {
  args: {
    title: 'Title',
    text: 'Text',
    align: TextAlign.RIGHT,
  },
}

export const Dark: Story = {
  args: {
    title: 'Title',
    text: 'Text',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  args: {
    title: 'Title',
    text: 'Text',
  },
  decorators: [ThemeDecorator(Theme.RED)],
}
