import type { StoryObj, Meta } from '@storybook/react'
import { Br } from './Br'

export default {
  title: 'AFiletemplate/Br',
  component: Br,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Br>

type Story = StoryObj<typeof Br>

export const Primary: Story = {
  args: {},
}
