import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { Input } from 'shared/ui/Input/Input'

export default {
  title: 'shared/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => (
  <Input {...args} />
)

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  placeholder: 'Placeholder',
}

export const WithValue = Template.bind({})
WithValue.args = {
  placeholder: 'Placeholder',
  value: 'Value',
}
