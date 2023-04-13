import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
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
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} />
)

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
