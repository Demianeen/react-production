import type { Meta, StoryObj } from '@storybook/react'
import ProfileRating from './ProfileRating'

export default {
  title: 'features/ProfileRating',
  component: ProfileRating,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    profileId: 1,
  },
  parameters: {},
} as Meta<typeof ProfileRating>

type Story = StoryObj<typeof ProfileRating>

export const Rated: Story = {}

export const Unrated: Story = {}

export const Loading: Story = {}

export const Error: Story = {}
