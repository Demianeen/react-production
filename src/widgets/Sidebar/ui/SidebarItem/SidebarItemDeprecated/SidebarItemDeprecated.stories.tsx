import type { StoryObj, Meta } from '@storybook/react'
import { SidebarItemDeprecated } from './SidebarItemDeprecated'

export default {
  title: 'AFiletemplate/SidebarItemDeprecated',
  component: SidebarItemDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof SidebarItemDeprecated>

type Story = StoryObj<typeof SidebarItemDeprecated>

export const Primary: Story = {
  args: {},
}
