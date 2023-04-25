import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { Modal } from 'shared/ui/Modal/Modal'

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  isOpen: true,
  children: 'Hello',
}

// export const Dark = Template.bind({});
// Dark.args = {
//     isOpen: true,
//     children: 'Hello',
// };
// Dark.decorators = [ThemeDecorator(Theme.DARK)];
