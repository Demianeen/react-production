import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { ButtonSkeleton } from './ButtonSkeleton'

export default {
  title: 'shared/Button',
  component: ButtonSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
  decorators: [StoreDecorator()],
} as Meta<typeof ButtonSkeleton>

type Story = StoryObj<typeof ButtonSkeleton>

export const Skeleton: Story = {}
