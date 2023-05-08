import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { comments } from '../../model/mocks/data'
import { CommentList } from './CommentList'

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>

const Template: ComponentStory<typeof CommentList> = (
  args
) => <CommentList {...args} />

export const WithoutComments = Template.bind({})
WithoutComments.args = {}

export const WithComments = Template.bind({})
WithComments.args = {
  comments,
}

export const IsLoading = Template.bind({})
IsLoading.args = {
  isLoading: true,
}

export const Dark = Template.bind({})
Dark.args = {
  comments,
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {
  comments,
}
Red.decorators = [ThemeDecorator(Theme.RED)]
