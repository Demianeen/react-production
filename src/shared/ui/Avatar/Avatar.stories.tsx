import type { Meta, StoryObj } from '@storybook/react'
import AvatarImg from '@/shared/assets/mocks/avatar.jpeg'
import { Avatar } from './Avatar'

export default {
  title: 'shared/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    src: AvatarImg,
  },
} as Meta<typeof Avatar>

type Story = StoryObj<typeof Avatar>

export const Default: Story = {}

export const CustomSize: Story = {
  args: {
    size: '12rem',
  },
}
