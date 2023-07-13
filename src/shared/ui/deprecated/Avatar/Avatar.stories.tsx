import type { Meta, StoryObj } from '@storybook/react'
// import AvatarImg from '@/shared/assets/mocks/avatar.jpeg'
import { Avatar } from './Avatar'

export default {
  title: 'shared/deprecated/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    src: 'https://mockapi.com/avatar',
  },
} as Meta<typeof Avatar>

type Story = StoryObj<typeof Avatar>

export const Default: Story = {}

export const CustomSize: Story = {
  args: {
    size: '12rem',
  },
}

export const NoImage: Story = {
  args: {
    src: undefined,
  },
}

export const InvertedNoImage: Story = {
  args: {
    src: undefined,
    fallbackColor: 'invertedPrimary',
  },
}

export const Loading: Story = {
  args: {
    src: 'https://mockapi.com/avatar/loading',
  },
}
