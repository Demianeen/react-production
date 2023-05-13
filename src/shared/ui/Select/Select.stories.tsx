import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { action } from '@storybook/addon-actions'
import { LayoutDecorator } from 'shared/lib/storybook/LayoutDecorator'
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
    onChange: action('onChange'),
    defaultValue: 'default value',
  },
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => (
  <Select {...args} />
)

export const Default = Template.bind({})
Default.args = {
  label: 'label',
}

export const DirectionDownRight = Template.bind({})
DirectionDownRight.args = {
  label: 'label',
  direction: 'down-right',
}
DirectionDownRight.decorators = [
  LayoutDecorator('centered'),
]

export const DirectionUpLeft = Template.bind({})
DirectionUpLeft.args = {
  label: 'label',
  direction: 'up-left',
}
DirectionUpLeft.decorators = [LayoutDecorator('centered')]

export const DirectionUpRight = Template.bind({})
DirectionUpRight.args = {
  label: 'label',
  direction: 'up-right',
}
DirectionUpRight.decorators = [LayoutDecorator('centered')]

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {}

export const WithSelectedValue = Template.bind({})
WithSelectedValue.args = {
  value: '2',
}

export const Readonly = Template.bind({})
Readonly.args = {
  readonly: true,
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
