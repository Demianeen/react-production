import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'

import { CommentList } from './CommentList'

export default {
  title: 'shared/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>

const Template: ComponentStory<typeof CommentList> = (
  args
) => <CommentList {...args} />

export const Normal = Template.bind({})
Normal.args = {
  comments: [
    {
      id: '1',
      text: 'hello world',
      user: { id: '1', username: 'Vasya' },
    },
    {
      id: '2',
      text: 'Comment 2',
      user: { id: '1', username: 'Petya' },
    },
  ],
  isLoading: false,
}

export const Loading = Template.bind({})

Loading.parameters = {
  loki: {
    skip: true,
  },
}
Loading.args = {
  comments: [],
  isLoading: true,
}
