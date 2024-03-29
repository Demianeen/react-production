import type { HTMLAttributeAnchorTarget } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { VirtualizedArticleList } from '@/entities/Article'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Title } from '@/shared/ui/redesigned/Title'
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout'
import { useSelector } from 'react-redux'
import { useViewport } from '@/shared/lib/hooks/useViewport/useViewport'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { getArticles } from '../../../model/slice/articleInfiniteListSlice'
import { useArticleInfiniteListStartIndex } from '../../../model/selectors/getArticleInfiniteListStartIndex/getArticleInfiniteListStartIndex'
import { ArticleFiltersContainer } from '../../ArticleFiltersContainer/ArticleFiltersContainer'
import { useArticleInfiniteListView } from '../../../model/selectors/getArticleInfiniteListView/getArticleInfiniteListView'
import { useArticleInfiniteList } from '../../../lib/useArticleInfiniteList'
import { useArticleInfiniteListError } from '../../../model/selectors/getArticleInfiniteListError/getArticleInfiniteListError'
import { useArticleInfiniteListIsLoading } from '../../../model/selectors/getArticleInfiniteListIsLoading/getArticleInfiniteListIsLoading'
import styles from './ArticleInfiniteListRedesigned.module.scss'

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

  const { isMobile } = useViewport()

  const { onLoadNextPart, onOpenArticle } = useArticleInfiniteList(
    virtualizedListRef,
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
      layoutDisableWidth={1000}
      right={<ArticleFiltersContainer listRef={virtualizedListRef} />}
      rightContainerClassName={classNamesNew(styles.rightContainer, {
        [styles.mobile]: isMobile,
      })}
      content={
        <div style={{ width: '100%' }} ref={setVirtualizedListRef}>
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
