import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { Input } from './Input'

export default {
  title: 'shared/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    placeholder: 'Placeholder',
    labelText: 'Label',
  },
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => (
  <Input {...args} />
)

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {}

export const WithValue = Template.bind({})
WithValue.args = {
  value: 'Value',
}
