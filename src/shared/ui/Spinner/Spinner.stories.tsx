import type { ComponentStory, Meta } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Spinner } from './Spinner'

export default {
  title: 'shared/Spinner',
  component: Spinner,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Spinner>

const Template: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args} />
)

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
