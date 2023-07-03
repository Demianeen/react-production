import type { StoryObj, Meta } from '@storybook/react'
import { NotificationButtonRedesigned } from './NotificationButtonRedesigned'

export default {
  title: 'AFiletemplate/NotificationButtonRedesigned',
  component: NotificationButtonRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof NotificationButtonRedesigned>

type Story = StoryObj<typeof NotificationButtonRedesigned>

export const Primary: Story = {
  args: {},
}
