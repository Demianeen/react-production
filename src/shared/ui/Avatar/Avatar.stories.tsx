import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { Avatar } from './Avatar'
import AvatarImg from './storybook.jpeg'

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
