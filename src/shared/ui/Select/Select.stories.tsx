import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Select } from './Select'

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
  },
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => (
  <Select {...args} />
)

export const Light = Template.bind({})
Light.args = {
  label: 'label',
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {}

export const WithSelectedValue = Template.bind({})
WithSelectedValue.args = {
  value: '2',
}

export const Dark = Template.bind({})
Dark.args = {
  label: 'label',
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {
  label: 'label',
}
Red.decorators = [ThemeDecorator(Theme.RED)]
