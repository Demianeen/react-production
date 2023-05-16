import React, { memo, useRef } from 'react'
import { Page } from 'widgets/Page/ui/Page/Page'
import { ArticleInfiniteList } from 'features/ArticleInfiniteList'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const pageRef = useRef<HTMLDivElement>(null)

  return (
    <Page ref={pageRef} className={className}>
      <ArticleInfiniteList scrollParentRef={pageRef} />
    </Page>
  )
}

export default memo(ArticlesPage)
