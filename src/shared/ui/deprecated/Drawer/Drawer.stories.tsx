import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { Card } from '../Card'
import { VStack } from '../../redesigned/Stack'
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
} as Meta<typeof Drawer>

type Story = StoryObj<typeof Drawer>

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
