import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { rest } from 'msw'
import { mockProfile } from '../../model/mocks/data'
import { ProfileValidationError } from '../../model/types/profileSchema'
import { EditableProfileCard } from './EditableProfileCard'

export default {
  title: 'features/EditableProfileCard',
  component: EditableProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    id: 1,
  },
  msw: {
    handlers: {
      editableProfileCard: rest.get(
        '/profile/:profileId',
        (req, res, ctx) => {
          const { profileId = '1' } = req.params

          return res(
            ctx.status(200),
            ctx.json({
              ...mockProfile,
              id: Number(profileId),
            })
          )
        }
      ),
    },
  },
  decorators: [StoreDecorator()],
} as ComponentMeta<typeof EditableProfileCard>

const Template: ComponentStory<typeof EditableProfileCard> =
  (args) => <EditableProfileCard {...args} />

const data = {
  firstName: 'Demian',
  lastName: 'Netliukh',
  age: 30,
  currency: Currency.USD,
  country: Country.UK,
  city: 'London',
  username: 'admin',
  avatar:
    'https://lablab.ai/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Flablab-static-eu%2Fimages%252Fusers%252Fcldzwest200dfb70s3i8pc564_5w13le5_picture.jpg&w=256&q=75',
}

export const Light = Template.bind({})
Light.args = {}
// Light.decorators = [
//   StoreDecorator({
//     profile: {
//       form: data,
//       isReadonly: true,
//     },
//   }),
// ]

export const Error = Template.bind({})
Error.args = {}
Error.decorators = [
  StoreDecorator({
    profile: {
      validationErrors: [
        ProfileValidationError.NO_DATA,
        ProfileValidationError.INCORRECT_AGE,
        ProfileValidationError.MISSING_AGE,
        ProfileValidationError.MISSING_FIRST_NAME,
        ProfileValidationError.MISSING_LAST_NAME,
        ProfileValidationError.MISSING_USERNAME,
        ProfileValidationError.MISSING_CITY,
        ProfileValidationError.MISSING_AGE,
        ProfileValidationError.INCORRECT_AGE,
        ProfileValidationError.UNKNOWN_SERVER_ERROR,
      ],
    },
  }),
]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      form: data,
      isReadonly: true,
    },
  }),
]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [
  ThemeDecorator(Theme.RED),
  StoreDecorator({
    profile: {
      form: data,
      isReadonly: true,
    },
  }),
]
