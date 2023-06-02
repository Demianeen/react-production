import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { VStack } from '../Stack'
import { Card } from '../Card'
import { Drawer } from './Drawer'

export default {
  title: 'shared/Drawer',
  component: Drawer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    isOpen: true,
    children: (
      <VStack gap={2} maxWidth maxHeight>
        <Card maxWidth>Drawer content</Card>
        <Card maxWidth>Drawer content</Card>
        <Card maxWidth>Drawer content</Card>
        <Card maxWidth>Drawer content</Card>
      </VStack>
    ),
  },
  parameters: {
    // because drawer uses portal
    loki: {
      skip: true,
    },
  },
  decorators: [StoreDecorator()],
} as Meta<typeof Drawer>

type Story = StoryObj<typeof Drawer>

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
