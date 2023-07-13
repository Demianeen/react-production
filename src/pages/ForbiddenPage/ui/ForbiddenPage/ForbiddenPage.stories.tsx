import type { Meta, StoryObj } from '@storybook/react'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import ForbiddenPage from './ForbiddenPage'

export default {
  title: 'pages/ForbiddenPage',
  component: ForbiddenPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ForbiddenPage>

type Story = StoryObj<typeof ForbiddenPage>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {
  decorators: [LayoutDecorator('fullpage')],
}
