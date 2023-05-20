import type { ComponentStory, Meta } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { Navbar } from './Navbar'

export default {
  title: 'widgets/Navbar',
  component: Navbar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Navbar>

const Template: ComponentStory<typeof Navbar> = (args) => (
  <Navbar {...args} />
)

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [StoreDecorator()]

export const Logged = Template.bind({})
Logged.args = {}
Logged.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: 1,
        username: 'username',
      },
    },
  }),
]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator(),
]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [
  ThemeDecorator(Theme.RED),
  StoreDecorator(),
]
