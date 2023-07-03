import type { StoryObj, Meta } from '@storybook/react'
import { NotificationButtonDeprecated } from './NotificationButtonDeprecated'

export default {
  title: 'AFiletemplate/NotificationButtonDeprecated',
  component: NotificationButtonDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof NotificationButtonDeprecated>

type Story = StoryObj<typeof NotificationButtonDeprecated>

export const Primary: Story = {
  args: {},
}
