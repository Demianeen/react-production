import type { StoryObj, Meta } from '@storybook/react'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { TooltipButton } from './TooltipButton'

export default {
  title: 'shared/redesigned/TooltipButton',
  component: TooltipButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    tooltipText: 'Tooltip text',
    children: 'Hover me',
  },
  decorators: [LayoutDecorator('centered')],
} as Meta<typeof TooltipButton>

type Story = StoryObj<typeof TooltipButton>

export const Bottom: Story = {
  args: {},
}

export const Top: Story = {
  args: {
    tooltipPosition: 'top',
  },
}

export const Left: Story = {
  args: {
    tooltipPosition: 'left',
  },
}

export const Right: Story = {
  args: {
    tooltipPosition: 'right',
  },
}

export const Disabled: Story = {
  args: {
    disableTooltip: true,
  },
}
