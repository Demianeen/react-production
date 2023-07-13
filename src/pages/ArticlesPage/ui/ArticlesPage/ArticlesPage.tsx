import { memo, useState } from 'react'
import { ArticleInfiniteList } from '@/widgets/ArticleInfiniteList'
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting'
import { Page } from '@/widgets/Page'
import { ToggleFeature } from '@/shared/lib/features'
import { useWindowScroll } from '@/shared/lib/scroll/useWindowScroll'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const [pageRef, setPageRef] = useState<HTMLDivElement | null>(null)
  const windowScroll = useWindowScroll()

  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={
        <Page className={className} data-testid='ArticlesPage'>
          <ArticleInfiniteList scrollParent={windowScroll} />
          <ArticlePageGreeting />
        </Page>
      }
      off={
        <Page
          ref={setPageRef}
          className={className}
          data-testid='ArticlesPage'
        >
          <ArticleInfiniteList scrollParent={pageRef} />
          <ArticlePageGreeting />
        </Page>
      }
    />
  )
}

export default memo(ArticlesPage)
