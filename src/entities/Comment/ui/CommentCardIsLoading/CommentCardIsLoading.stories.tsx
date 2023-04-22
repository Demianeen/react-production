import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { CommentCardIsLoading } from './CommentCardIsLoading'

export default {
  title: 'entities/Comment/CommentCardIsLoading',
  component: CommentCardIsLoading,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCardIsLoading>

const Template: ComponentStory<
  typeof CommentCardIsLoading
> = (args) => <CommentCardIsLoading {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
