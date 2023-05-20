import type { ComponentStory, Meta } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { SuspenseWithSpinner } from 'shared/ui/SuspenseWithSpinner/SuspenseWithSpinner'
import { ArticleDetailsPageFooter } from './ArticleDetailsPageFooter'

export default {
  title:
    'pages/ArticleDetailsPage/ArticleDetailsPageFooter',
  component: ArticleDetailsPageFooter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
} as Meta<typeof ArticleDetailsPageFooter>

const Template: ComponentStory<
  typeof ArticleDetailsPageFooter
> = (args) => (
  <SuspenseWithSpinner>
    <ArticleDetailsPageFooter {...args} />
  </SuspenseWithSpinner>
)

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
