import type { ComponentStory, Meta } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { EditableProfileCardHeader } from './EditableProfileCardHeader'

export default {
  title: 'features/EditableProfileCardHeader',
  component: EditableProfileCardHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
} as Meta<typeof EditableProfileCardHeader>

const Template: ComponentStory<
  typeof EditableProfileCardHeader
> = () => <EditableProfileCardHeader />

const canEditState = {
  profile: {
    data: {
      id: 1,
    },
  },
  user: {
    authData: {
      id: 1,
    },
  },
}

export const CanEdit = Template.bind({})
CanEdit.args = {}
CanEdit.decorators = [StoreDecorator(canEditState)]

export const CannotEdit = Template.bind({})
CannotEdit.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator(canEditState),
]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [
  ThemeDecorator(Theme.RED),
  StoreDecorator(canEditState),
]
