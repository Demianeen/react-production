import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Currency } from 'entities/Currency/model/types/currency'
import { Country } from 'entities/Country'
import { ProfileCard } from './ProfileCard'

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (
  args
) => <ProfileCard {...args} />

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
Light.args = {
  data,
}

export const Readonly = Template.bind({})
Readonly.args = {
  data,
  readonly: true,
}

export const WithoutValues = Template.bind({})
WithoutValues.args = {}

export const Loading = Template.bind({})
Loading.args = {
  isLoading: true,
}

export const Error = Template.bind({})
Error.args = {
  error: 'Error',
}

export const Dark = Template.bind({})
Dark.args = {
  data,
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
