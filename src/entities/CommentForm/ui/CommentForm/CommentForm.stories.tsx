import type { ComponentStory, Meta } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { action } from '@storybook/addon-actions'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import CommentForm from './CommentForm'

export default {
  title: 'features/CommentForm',
  component: CommentForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onSendComment: action('onSendComment'),
  },
} as Meta<typeof CommentForm>

const Template: ComponentStory<typeof CommentForm> = (
  args
) => <CommentForm {...args} />

export const WithoutValue = Template.bind({})
WithoutValue.args = {}
WithoutValue.decorators = [StoreDecorator()]

export const WithValue = Template.bind({})
WithValue.args = {}
WithValue.decorators = [
  StoreDecorator({
    commentForm: {
      body: 'some value',
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
