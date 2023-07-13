import type { Meta, StoryObj } from '@storybook/react'
// eslint-disable-next-line netliukh-demian-fsd-plugin/layer-imports
import { Page } from '@/widgets/Page'
import { useState } from 'react'
import { ArticleInfiniteListRedesigned } from './ArticleInfiniteListRedesigned'

export default {
  title: 'widgets/ArticleInfiniteList/ArticleInfiniteList/redesigned',
  component: (...props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pageRef, setPageRef] = useState<HTMLDivElement | null>(
      null
    )

    return (
      <Page ref={setPageRef}>
        <ArticleInfiniteListRedesigned
          scrollParent={pageRef}
          {...props}
        />
      </Page>
    )
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (StoryComponent) => {
      const [pageRef, setPageRef] = useState<HTMLDivElement | null>(
        null
      )

      return (
        <Page ref={setPageRef}>
          <StoryComponent scrollParent={pageRef} />
        </Page>
      )
    },
  ],
} as Meta<typeof ArticleInfiniteListRedesigned>

type Story = StoryObj<typeof ArticleInfiniteListRedesigned>

export const Light: Story = {}

export const Loading: Story = {}
