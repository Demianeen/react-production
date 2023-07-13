import type { StoryObj, Meta } from '@storybook/react'
import { Card } from '@/shared/ui/redesigned/Card'
import { StickyContentLayout } from './StickyContentLayout'

export default {
  title: 'layouts/StickyContentLayout',
  component: StickyContentLayout,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    content: (
      <div>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
        <Card>Content</Card>
      </div>
    ),
    left: 'Left',
    right: 'Right',
  },
  decorators: [],
} as Meta<typeof StickyContentLayout>

type Story = StoryObj<typeof StickyContentLayout>

export const All: Story = {
  args: {},
}

export const OnlyLeft: Story = {
  args: {
    right: undefined,
  },
}

export const OnlyRight: Story = {
  args: {
    left: undefined,
  },
}
