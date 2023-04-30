import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { action } from '@storybook/addon-actions'
import { SelectView } from './SelectView'
import { View } from '../model/types/view'

export default {
  title: 'entities/View',
  component: SelectView,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    value: View.LIST,
    onChangeView: action('onChange'),
  },
} as ComponentMeta<typeof SelectView>

const Template: ComponentStory<typeof SelectView> = (
  args
) => <SelectView {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
