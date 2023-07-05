import type { StoryObj, Meta } from '@storybook/react'
import { Toggle } from './Toggle'

export default {
  title: 'AFiletemplate/Switch',
  component: Toggle,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Toggle>

type Story = StoryObj<typeof Toggle>

export const Primary: Story = {
  args: {},
}
