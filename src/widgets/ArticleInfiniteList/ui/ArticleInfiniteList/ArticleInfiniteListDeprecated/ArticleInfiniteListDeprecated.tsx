import type { HTMLAttributeAnchorTarget } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { VirtualizedArticleList } from '@/entities/Article'
import { Text, TextSize } from '@/shared/ui/deprecated/Text'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { useArticleInfiniteListError } from '../../../model/selectors/getArticleInfiniteListError/getArticleInfiniteListError'
import { useArticleInfiniteListIsLoading } from '../../../model/selectors/getArticleInfiniteListIsLoading/getArticleInfiniteListIsLoading'
import { useArticleInfiniteListStartIndex } from '../../../model/selectors/getArticleInfiniteListStartIndex/getArticleInfiniteListStartIndex'
import { useArticleInfiniteListView } from '../../../model/selectors/getArticleInfiniteListView/getArticleInfiniteListView'
import { getArticles } from '../../../model/slice/articleInfiniteListSlice'
import { ArticleInfiniteListFilters } from '../../ArticleInfiniteListFilters/ArticleInfiniteListFilters'
import { useArticleInfiniteList } from '../../../lib/useArticleInfiniteList'

interface ArticleInfiniteListDeprecatedProps {
  className?: string
  scrollParent?: HTMLElement | null
  target?: HTMLAttributeAnchorTarget
}

export const ArticleInfiniteListDeprecated = ({
  className,
  scrollParent,
  target,
}: ArticleInfiniteListDeprecatedProps) => {
  const [virtualizedListRef, setVirtualizedListRef] =
    useState<HTMLDivElement | null>(null)

  const { t } = useTranslation('articles')

  const articles = useSelector(getArticles.selectAll)
  const isLoading = useArticleInfiniteListIsLoading()
  const error = useArticleInfiniteListError()
  const startIndex = useArticleInfiniteListStartIndex()
  const view = useArticleInfiniteListView()

  const { onLoadNextPart, onOpenArticle } = useArticleInfiniteList(
    virtualizedListRef
  )

  if (error) {
    return (
      <HStack justify='center' align='center' maxWidth maxHeight>
        <Text
          title={t('Failed to load articles')}
          size={TextSize.L}
        />
      </HStack>
    )
  }

  return (
    <div ref={setVirtualizedListRef}>
      <VirtualizedArticleList
        articles={articles}
        isLoading={isLoading}
        view={view}
        className={className}
        onLoadNextPart={onLoadNextPart}
        scrollParent={scrollParent}
        Header={ArticleInfiniteListFilters}
        startIndex={startIndex}
        onOpenArticle={onOpenArticle}
        target={target}
      />
    </div>
  )
}
