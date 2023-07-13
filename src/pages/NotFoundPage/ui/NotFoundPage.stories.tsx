import type { Meta, StoryObj } from '@storybook/react'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import NotFoundPage from './NotFoundPage'

export default {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [LayoutDecorator('fullpage')],
} as Meta<typeof NotFoundPage>

type Story = StoryObj<typeof NotFoundPage>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
