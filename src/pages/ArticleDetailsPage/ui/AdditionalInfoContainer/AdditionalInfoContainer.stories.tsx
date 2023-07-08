import type { StoryObj, Meta } from '@storybook/react'
import { AdditionalInfoContainer } from './AdditionalInfoContainer'

export default {
  title: 'AFiletemplate/AdditionalInfoContainer',
  component: AdditionalInfoContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof AdditionalInfoContainer>

type Story = StoryObj<typeof AdditionalInfoContainer>

export const Primary: Story = {
  args: {},
}
