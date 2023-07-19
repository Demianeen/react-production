import type { StoryObj, Meta } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { mockArticle } from '@/entities/Article/testing'
import { RoutePath } from '@/shared/const/router/routePath'
import { ToggleDesignDecorator } from '@/shared/lib/storybook/ToggleDesignDecorator'
import { LokiDelayDecorator } from '@/shared/lib/storybook/LokiDelayDecorator'
import { AdditionalInfoContainer } from './AdditionalInfoContainer'

export default {
  title: 'pages/ArticleDetailsPage/AdditionalInfoContainer',
  component: AdditionalInfoContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    reactRouter: {
      routePath: RoutePath.articleDetails,
      routeParams: { id: '1' },
    },
  },
  decorators: [ToggleDesignDecorator(true), LokiDelayDecorator()],
} as Meta<typeof AdditionalInfoContainer>

type Story = StoryObj<typeof AdditionalInfoContainer>

export const Primary: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      articleDetails: {
        data: mockArticle,
        isLoading: false,
      },
    }),
  ],
}

export const Loading: Story = {
  decorators: [
    StoreDecorator({
      articleDetails: {
        data: mockArticle,
        isLoading: true,
      },
    }),
  ],
}
