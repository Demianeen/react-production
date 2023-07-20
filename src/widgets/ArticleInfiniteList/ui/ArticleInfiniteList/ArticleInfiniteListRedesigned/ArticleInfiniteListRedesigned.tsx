import type { HTMLAttributeAnchorTarget } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { VirtualizedArticleList } from '@/entities/Article'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Title } from '@/shared/ui/redesigned/Title'
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout'

import { useArticleInfiniteListStartIndex } from '../../../model/selectors/getArticleInfiniteListStartIndex/getArticleInfiniteListStartIndex'
import { ArticleFiltersContainer } from '../../ArticleFiltersContainer/ArticleFiltersContainer'
import { ArticleViewSelectorContainer } from '../../ArticleViewSelectorContainer/ArticleViewSelectorContainer'
import { useArticleInfiniteListView } from '../../../model/selectors/getArticleInfiniteListView/getArticleInfiniteListView'
import { getArticles } from '../../../model/slice/articleInfiniteListSlice'
import styles from './ArticleInfiniteListRedesigned.module.scss'
import { useArticleInfiniteList } from '../../../lib/useArticleInfiniteList'
import { useArticleInfiniteListError } from '../../../model/selectors/getArticleInfiniteListError/getArticleInfiniteListError'
import { useArticleInfiniteListIsLoading } from '../../../model/selectors/getArticleInfiniteListIsLoading/getArticleInfiniteListIsLoading'

export interface ArticleInfiniteListRedesignedProps {
  className?: string
  scrollParent?: HTMLElement | null
  target?: HTMLAttributeAnchorTarget
}

// TODO: Make navigation through articles with tabs
export const ArticleInfiniteListRedesigned = ({
  className,
  scrollParent,
  target,
}: ArticleInfiniteListRedesignedProps) => {
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
        <Title level={2}>{t('Failed to load articles')}</Title>
      </HStack>
    )
  }

  return (
    <StickyContentLayout
      className={styles.stickyContentLayout}
      right={
        <VStack gap={1}>
          <ArticleViewSelectorContainer />
          <ArticleFiltersContainer />
        </VStack>
      }
      content={
        <div ref={setVirtualizedListRef}>
          <VirtualizedArticleList
            articles={articles}
            isLoading={isLoading}
            view={view}
            className={className}
            onLoadNextPart={onLoadNextPart}
            scrollParent={scrollParent}
            startIndex={startIndex}
            onOpenArticle={onOpenArticle}
            target={target}
          />
        </div>
      }
    />
  )
}
