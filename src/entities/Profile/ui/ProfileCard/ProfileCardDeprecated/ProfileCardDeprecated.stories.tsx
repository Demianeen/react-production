import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { Currency } from '@/entities/Currency'
import { Country } from '@/entities/Country'
import avatar from '@/shared/assets/mocks/avatar.jpeg'
import { LokiDelayDecorator } from '@/shared/lib/storybook/LokiDelayDecorator'
import { ProfileCardDeprecated } from './ProfileCardDeprecated'

export default {
  title: 'entities/ProfileCard/deprecated',
  component: ProfileCardDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [LokiDelayDecorator()],
} as Meta<typeof ProfileCardDeprecated>

type Story = StoryObj<typeof ProfileCardDeprecated>
const data = {
  firstName: 'Demian',
  lastName: 'Netliukh',
  age: 30,
  currency: Currency.USD,
  country: Country.UK,
  city: 'London',
  username: 'admin',
  avatar,
}

export const Light: Story = {
  args: {
    data,
  },
}

export const Readonly: Story = {
  args: {
    data,
    readonly: true,
  },
}

export const WithoutValues: Story = {}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}

export const Error: Story = {
  args: {
    error: 'Error',
  },
}

export const Dark: Story = {
  args: {
    data,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  args: {
    data,
  },
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
