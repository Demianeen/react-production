import type { StoryObj, Meta } from '@storybook/react'
import { MainLayout } from './MainLayout'

export default {
  title: 'AFiletemplate/MainLayout',
  component: MainLayout,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof MainLayout>

type Story = StoryObj<typeof MainLayout>

export const Primary: Story = {
  args: {},
}
