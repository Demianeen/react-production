import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import AvatarImg from 'shared/assets/tests/storybook.jpeg'
import { Avatar } from './Avatar'

export default {
  title: 'shared/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    src: AvatarImg,
  },
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} />
)

export const Default = Template.bind({})
Default.args = {}

export const CustomSize = Template.bind({})
CustomSize.args = {
  size: '12rem',
}
