import React, { memo } from 'react'
import { ArticleList, ArticleView } from 'entities/Article'
import { article } from 'entities/Article/model/mocks/tests'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  return (
    <div>
      <ArticleList
        articles={new Array(16)
          .fill(null)
          .map((array, index) => ({
            ...article,
            id: index,
          }))}
        isLoading={false}
        view={ArticleView.GRID}
      />
    </div>
  )
}

export default memo(ArticlesPage)
