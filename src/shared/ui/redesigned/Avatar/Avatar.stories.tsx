import type { Meta, StoryObj } from '@storybook/react'
// eslint-disable-next-line netliukh-demian-fsd-plugin/layer-imports
import { mockUser } from '@/entities/User/testing'
import avatar from '@/shared/assets/mocks/avatar.jpeg'
import { Avatar } from './Avatar'

export default {
  title: 'shared/redesigned/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    src: avatar,
  },
} as Meta<typeof Avatar>

type Story = StoryObj<typeof Avatar>

export const Default: Story = {}

export const WithUsernameClickable: Story = {
  args: {
    user: mockUser,
  },
}

export const ClickableWithoutUsername: Story = {
  args: {
    user: mockUser,
    notShowUsername: true,
  },
}

export const WithUsernameNotClickable: Story = {
  args: {
    user: mockUser,
    noWrapInLink: true,
  },
}

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

export const Loading: Story = {
  args: {
    src: 'https://mockapi.com/avatar/loading',
  },
}
