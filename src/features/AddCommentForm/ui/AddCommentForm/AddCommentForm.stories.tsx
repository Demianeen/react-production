import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { action } from '@storybook/addon-actions'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import AddCommentForm from './AddCommentForm'

export default {
  title: 'AddCommentForm/AddCommentForm',
  component: AddCommentForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onSendComment: action('onSendComment'),
  },
} as ComponentMeta<typeof AddCommentForm>

const Template: ComponentStory<typeof AddCommentForm> = (
  args
) => <AddCommentForm {...args} />

export const WithoutValue = Template.bind({})
WithoutValue.args = {}
WithoutValue.decorators = [StoreDecorator()]

export const WithValue = Template.bind({})
WithValue.args = {}
WithValue.decorators = [
  StoreDecorator({
    addCommentForm: {
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
