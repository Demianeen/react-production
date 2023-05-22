import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Modal } from './Modal'

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    isOpen: true,
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas, quibusdam, voluptates voluptatibus quidem quos v oluptatum quia quod. Quisquam quae quod, voluptas, quibusdam, voluptates voluptatibus quidem quos v oluptatum quia quod. Quisquam quae quod, voluptas, quibusdam, voluptates voluptatibus quidem quos v oluptatum quia quod. Quisquam quae quod, voluptas, quibusdam, voluptates voluptatibus quidem quos v oluptatum quia quod. Quisquam quae quod, voluptas, quibusdam, voluptates voluptatibus quidem quos v',
  },
} as Meta<typeof Modal>

type Story = StoryObj<typeof Modal>

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
