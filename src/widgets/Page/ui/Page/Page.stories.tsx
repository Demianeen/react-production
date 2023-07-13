import type { Meta, StoryObj } from '@storybook/react'
import { Page } from './Page'

export default {
  title: 'widgets/Page',
  component: Page,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Page',
  },
} as Meta<typeof Page>

type Story = StoryObj<typeof Page>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
