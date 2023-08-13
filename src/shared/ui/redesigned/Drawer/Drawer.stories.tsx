import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { ToggleDesignDecorator } from '@/shared/lib/storybook/ToggleDesignDecorator'
import { Card } from '../Card'
import { VStack } from '../Stack'
import { Drawer } from './Drawer'

export default {
  title: 'shared/redesigned/Drawer',
  component: Drawer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    isOpen: true,
    children: (
      <VStack gap={1} maxWidth maxHeight>
        <Card maxWidth>Drawer content</Card>
        <Card maxWidth>Drawer content</Card>
        <Card maxWidth>Drawer content</Card>
        <Card maxWidth>Drawer content</Card>
      </VStack>
    ),
  },
} as Meta<typeof Drawer>

type Story = StoryObj<typeof Drawer>

export const Primary: Story = {}
export const PrimaryDeprecated: Story = {
  decorators: [ToggleDesignDecorator(false)],
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
