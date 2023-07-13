import type { Meta, StoryObj } from '@storybook/react'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { PageError } from './PageError'

export default {
  title: 'widgets/PageError',
  component: PageError,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [LayoutDecorator('fullpage')],
} as Meta<typeof PageError>

type Story = StoryObj<typeof PageError>
export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
