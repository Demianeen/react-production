import type { Meta, StoryObj } from '@storybook/react'
import ForbiddenPage from './ForbiddenPage'

export default {
  title: 'pages/ForbiddenPage',
  component: ForbiddenPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ForbiddenPage>

type Story = StoryObj<typeof ForbiddenPage>
export const Light: Story = {}
