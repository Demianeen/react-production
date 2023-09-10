import type { StoryObj, Meta } from '@storybook/react'
import { Placeholder } from './Placeholder'

export default {
  title: 'AFiletemplate/Placeholder',
  component: Placeholder,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Placeholder>

type Story = StoryObj<typeof Placeholder>

export const Primary: Story = {
  args: {},
}
