import type { Meta, StoryObj } from '@storybook/react'
// import AvatarImg from '@/shared/assets/mocks/avatar.jpeg'
import { LoaderLayout } from './LoaderLayout'

export default {
  title: 'widgets/LoaderLayout',
  component: LoaderLayout,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof LoaderLayout>

type Story = StoryObj<typeof LoaderLayout>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
