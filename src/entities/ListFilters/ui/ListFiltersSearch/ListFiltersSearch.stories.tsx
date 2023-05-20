import type { ComponentStory, Meta } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { ListFiltersSearch } from './ListFiltersSearch'

export default {
  title: 'entities/ListFilters/ListFiltersSearch',
  component: ListFiltersSearch,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
} as Meta<typeof ListFiltersSearch>

const Template: ComponentStory<typeof ListFiltersSearch> = (
  args
) => <ListFiltersSearch {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
