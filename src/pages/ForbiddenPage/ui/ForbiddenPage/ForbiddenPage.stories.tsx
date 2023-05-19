import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import ForbiddenPage from './ForbiddenPage'

export default {
  title: 'pages/ForbiddenPage',
  component: ForbiddenPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ForbiddenPage>

const Template: ComponentStory<typeof ForbiddenPage> = (
  args
) => <ForbiddenPage {...args} />

export const Light = Template.bind({})
Light.args = {}
