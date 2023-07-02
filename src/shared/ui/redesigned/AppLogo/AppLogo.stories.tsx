import type { StoryObj, Meta } from '@storybook/react'
import { AppLogo } from './AppLogo'

export default {
  title: 'AFiletemplate/AppLogo',
  component: AppLogo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof AppLogo>

type Story = StoryObj<typeof AppLogo>

export const Primary: Story = {
  args: {},
}
