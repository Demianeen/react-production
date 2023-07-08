import type { StoryObj, Meta } from '@storybook/react'
import { DetailsContainer } from './DetailsContainer'

export default {
  title: 'AFiletemplate/DetailsContainer',
  component: DetailsContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof DetailsContainer>

type Story = StoryObj<typeof DetailsContainer>

export const Primary: Story = {
  args: {},
}
