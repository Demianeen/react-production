import { memo, useState } from 'react'
import { ArticleInfiniteList } from '@/widgets/ArticleInfiniteList'
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting'
import { Page } from '@/widgets/Page'
import { ToggleFeature } from '@/shared/lib/features'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const [pageRef, setPageRef] = useState<HTMLDivElement | null>(null)

  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={
        <Page
          ref={setPageRef}
          className={className}
          data-testid='ArticlesPage'
        >
          <ArticleInfiniteList
            scrollParent={document.getElementById('mainLayout')}
          />
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
