import type { StoryObj, Meta } from '@storybook/react'
import { SidebarDeprecated } from './SidebarDeprecated'

export default {
  title: 'AFiletemplate/SidebarDeprecated',
  component: SidebarDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof SidebarDeprecated>

type Story = StoryObj<typeof SidebarDeprecated>

export const Primary: Story = {
  args: {},
}
