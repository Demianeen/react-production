import { memo, useRef } from 'react'
import { Page } from '@/widgets/Page'
import { ArticleInfiniteList } from '@/widgets/ArticleInfiniteList'
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const pageRef = useRef<HTMLDivElement>(null)

  return (
    <Page
      ref={pageRef}
      className={className}
      data-testid='ArticlesPage'
    >
      <ArticleInfiniteList scrollParentRef={pageRef} />
      <ArticlePageGreeting />
    </Page>
  )
}

export default memo(ArticlesPage)
