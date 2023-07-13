import type { Meta, StoryObj } from '@storybook/react'
import AboutPage from './AboutPage'

export default {
  title: 'pages/AboutPage',
  component: AboutPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof AboutPage>

type Story = StoryObj<typeof AboutPage>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
