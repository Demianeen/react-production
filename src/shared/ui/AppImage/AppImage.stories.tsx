import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { AppImage } from './AppImage'

export default {
  title: 'shared/AppImage',
  component: AppImage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    height: '100',
    width: '100',
    src: 'https://mockapi.com/article-image',
  },
  parameters: {},
} as Meta<typeof AppImage>

type Story = StoryObj<typeof AppImage>

export const Light: Story = {
  args: {},
}

export const Loading: Story = {
  args: {
    src: 'https://mockapi.com/article-image/loading',
    fallback: <div>Loading fallback...</div>,
  },
}

export const Error: Story = {
  args: {
    src: undefined,
    errorFallback: <div>Error fallback...</div>,
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
