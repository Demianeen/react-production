import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { Currency } from 'entities/Currency/model/types/currency'
import { Country } from 'entities/Country'
import ProfilePage from './ProfilePage'

export default {
  title: 'pages/EditableProfileCard',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>

const Template: ComponentStory<typeof ProfilePage> = () => (
  <ProfilePage />
)

const data = {
  firstName: 'Demian',
  lastName: 'Netliukh',
  age: 30,
  currency: Currency.USD,
  country: Country.UK,
  city: 'London',
  username: 'admin',
  avatar:
    'https://scontent-lcy1-1.cdninstagram.com/v/t51.2885-19/210524727_135821275300556_4358686441303680151_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-lcy1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=jbau73uvK2oAX9FYtHU&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfBl0F86J9cfXEDIOriixXt7iwtVwpd1Cp76-MBI_ERqIQ&oe=64352E23&_nc_sid=1527a3',
}

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [
  StoreDecorator({
    profile: {
      data,
    },
  }),
]

export const IsLoading = Template.bind({})
IsLoading.args = {}
IsLoading.decorators = [
  StoreDecorator({
    profile: {
      isLoading: true,
    },
  }),
]

export const Error = Template.bind({})
Error.args = {}
Error.decorators = [
  StoreDecorator({
    profile: {
      error: 'Error',
    },
  }),
]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      data,
    },
  }),
]
