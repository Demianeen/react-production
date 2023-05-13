import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { action } from '@storybook/addon-actions'
import { LayoutDecorator } from 'shared/lib/storybook/LayoutDecorator'
import { Dropdown } from './Dropdown'

export default {
  title: 'shared/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    triggerChildren: 'Trigger',
    items: [
      { label: 'Item 1', onClick: action('onClick') },
      {
        label: 'Item 2',
        href: '#',
        onClick: action('onClick'),
      },
      { label: 'Item 3', onClick: action('onClick') },
    ],
  },
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = (
  args
) => <Dropdown {...args} />

export const Light = Template.bind({})
Light.args = {}

export const DirectionDownRight = Template.bind({})
DirectionDownRight.args = {
  direction: 'down-right',
}
DirectionDownRight.decorators = [
  LayoutDecorator('centered'),
]

export const DirectionUpLeft = Template.bind({})
DirectionUpLeft.args = {
  direction: 'up-left',
}
DirectionUpLeft.decorators = [LayoutDecorator('centered')]

export const DirectionUpRight = Template.bind({})
DirectionUpRight.args = {
  direction: 'up-right',
}
DirectionUpRight.decorators = [LayoutDecorator('centered')]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
