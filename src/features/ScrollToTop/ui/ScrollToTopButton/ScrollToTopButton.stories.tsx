import type { Meta, StoryObj } from '@storybook/react'
import { ScrollToTopButton } from './ScrollToTopButton'

export default {
  title: 'features/ScrollToTop',
  component: ScrollToTopButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof ScrollToTopButton>

type Story = StoryObj<typeof ScrollToTopButton>

export const Light: Story = {}
