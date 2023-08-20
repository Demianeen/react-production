import type { StoryObj, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ToggleDesignDecorator } from '@/shared/lib/storybook/ToggleDesignDecorator'
import { FullPagePanel } from './FullPagePanel'

export default {
  title: 'shared/redesigned/FullPagePanel',
  component: FullPagePanel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof FullPagePanel>

type Story = StoryObj<typeof FullPagePanel>

const primary = {
  args: {
    isOpen: true,
    onClose: action('onClose'),
    children: 'FullPagePanel content',
  },
}

export const PrimaryRedesigned: Story = primary
export const PrimaryDeprecated: Story = {
  ...primary,
  decorators: [ToggleDesignDecorator(false)],
}
