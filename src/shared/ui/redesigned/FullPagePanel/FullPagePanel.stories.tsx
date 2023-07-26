import type { StoryObj, Meta } from '@storybook/react'
import { FullPagePanel } from './FullPagePanel'

export default {
  title: 'AFiletemplate/FullPagePanel',
  component: FullPagePanel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof FullPagePanel>

type Story = StoryObj<typeof FullPagePanel>

export const Primary: Story = {
  args: {},
}
