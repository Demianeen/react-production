import type { ComponentStory, Meta } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { action } from '@storybook/addon-actions'
import type { TabItem } from './Tabs'
import { Tabs } from './Tabs'

const tabs: TabItem<string>[] = [
  {
    label: 'Tab 1',
    value: 'tab1',
  },
  {
    label: 'Tab 2',
    value: 'tab2',
  },
  {
    label: 'Tab 3',
    value: 'tab3',
  },
]

export default {
  title: 'shared/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    tabs,
    value: 'tab2',
    onTabClick: action('onTabClick'),
  },
} as Meta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args} />
)

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
