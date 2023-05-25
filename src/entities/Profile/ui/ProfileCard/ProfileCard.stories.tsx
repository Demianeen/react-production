import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import { Currency } from '@/entities/Currency/model/const/currency'
import { Country } from '@/entities/Country'
import { ProfileCard } from './ProfileCard'

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ProfileCard>

type Story = StoryObj<typeof ProfileCard>
const data = {
  firstName: 'Demian',
  lastName: 'Netliukh',
  age: 30,
  currency: Currency.USD,
  country: Country.UK,
  city: 'London',
  username: 'admin',
  avatar: 'https://mockapi.com/avatar',
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

export const Red: Story = {
  args: {
    data,
  },
  decorators: [ThemeDecorator(Theme.RED)],
}
