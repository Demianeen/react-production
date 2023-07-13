import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from './Flex'

export default {
  title: 'shared/redesigned/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Flex>

type Story = StoryObj<typeof Flex>

const children = (
  <>
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </>
)

export const Row: Story = {
  args: {
    direction: 'row',
    children,
  },
}

export const RowGap025: Story = {
  args: {
    direction: 'row',
    gap: 0.25,
    children,
  },
}

export const RowGap05: Story = {
  args: {
    direction: 'row',
    gap: 0.5,
    children,
  },
}

export const RowGap1: Story = {
  args: {
    direction: 'row',
    gap: 1,
    children,
  },
}

export const RowGap2: Story = {
  args: {
    direction: 'row',
    gap: 2,
    children,
  },
}

export const Column: Story = {
  args: {
    direction: 'column',
    children,
  },
}

export const ColumnGap1: Story = {
  args: {
    direction: 'column',
    gap: 1,
    children,
  },
}

export const ColumnAlignEnd = {
  args: {
    direction: 'column',
    align: 'end',
    children,
  },
}
