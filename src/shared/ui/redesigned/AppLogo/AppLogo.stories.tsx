import type { StoryObj, Meta } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { AppLogo } from './AppLogo'

export default {
  title: 'shared/redesigned/AppLogo',
  component: AppLogo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof AppLogo>

type Story = StoryObj<typeof AppLogo>

export const Primary: Story = {
  args: {},
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
