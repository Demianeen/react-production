import type { StoryObj, Meta } from '@storybook/react'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { ToggleDesignDecorator } from '@/shared/lib/storybook/ToggleDesignDecorator'
import { Button as ButtonDeprecated } from '../../deprecated/Button'
import { Button } from '../Button'
import { TooltipButton } from './TooltipButton'

export default {
  title: 'shared/redesigned/WithTooltip',
  component: TooltipButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    tooltipText: 'Tooltip text',
    children: <Button type='button'>Hover me</Button>,
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

export const Deprecated: Story = {
  args: {
    children: (
      <ButtonDeprecated type='button'>Hover me</ButtonDeprecated>
    ),
  },
  decorators: [ToggleDesignDecorator(false)],
}
