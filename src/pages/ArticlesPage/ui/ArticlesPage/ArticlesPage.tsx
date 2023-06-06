import { memo, useRef } from 'react'
import { Page } from '@/widgets/Page'
import { ArticleInfiniteList } from '@/widgets/ArticleInfiniteList'

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
    </Page>
  )
}

export default memo(ArticlesPage)
