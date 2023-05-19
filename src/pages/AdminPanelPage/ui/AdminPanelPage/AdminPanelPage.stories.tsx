import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import AdminPanelPage from './AdminPanelPage'

export default {
  title: 'pages/AdminPanelPage',
  component: AdminPanelPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AdminPanelPage>

const Template: ComponentStory<typeof AdminPanelPage> = (
  args
) => <AdminPanelPage {...args} />

export const Light = Template.bind({})
Light.args = {}
