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

export const RatedDeprecated: Story = {}
export const RatedRedesigned: Story = {}

export const UnratedDeprecated: Story = {}
export const UnratedRedesigned: Story = {}

export const LoadingDeprecated: Story = {}
export const LoadingRedesigned: Story = {}

export const ErrorDeprecated: Story = {}
export const ErrorRedesigned: Story = {}
