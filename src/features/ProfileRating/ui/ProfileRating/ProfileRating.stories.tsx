import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { InitUserDecorator } from '@/shared/lib/storybook/InitUserDecorator'
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
  decorators: [InitUserDecorator(), StoreDecorator()],
} as Meta<typeof ProfileRating>

type Story = StoryObj<typeof ProfileRating>

export const Rated: Story = {}

export const Unrated: Story = {}

export const Loading: Story = {}

export const Error: Story = {}
