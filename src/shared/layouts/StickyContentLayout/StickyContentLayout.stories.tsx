import type { StoryObj, Meta } from '@storybook/react'
import { StickyContentLayout } from './StickyContentLayout'

export default {
  title: 'AFiletemplate/StickyContentLayout',
  component: StickyContentLayout,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof StickyContentLayout>

type Story = StoryObj<typeof StickyContentLayout>

export const Primary: Story = {
  args: {},
}
