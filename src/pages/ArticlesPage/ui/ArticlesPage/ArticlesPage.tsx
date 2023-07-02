import { memo, useState } from 'react'
import { ArticleInfiniteList } from '@/widgets/ArticleInfiniteList'
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting'
import { Page } from '@/widgets/Page'
import { toggleFeature } from '@/shared/lib/features'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const [pageRef, setPageRef] = useState<HTMLDivElement | null>(null)

  return (
    <Page
      ref={setPageRef}
      className={className}
      data-testid='ArticlesPage'
    >
      <ArticleInfiniteList
        scrollParent={toggleFeature({
          name: 'isAppRedesigned',
          on: () => document.getElementById('mainLayout'),
          off: () => pageRef,
        })}
      />
      <ArticlePageGreeting />
    </Page>
  )
}

export default memo(ArticlesPage)
