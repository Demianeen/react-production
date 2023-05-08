import React, { memo, useCallback, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import type { SelectOption } from 'shared/ui/Select/Select'
import { Select } from 'shared/ui/Select/Select'
import { useTranslation } from 'react-i18next'
import { SortOrder } from 'shared/types/sort'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import {
  articlesPageActions,
  fetchArticles,
} from 'pages/ArticlesPage'
import { sortedArticleListActions } from '../../model/slice/sortedArticleListSlice'
import { ArticleSortField } from '../../model/types/sortedArticleListSchema'
import { getSortedArticleListOrder } from '../../model/selectors/getSortedArticleListOrder/getSortedArticleListOrder'
import { getSortedArticleListSortField } from '../../model/selectors/getSortedArticleListSortField/getSortedArticleListSortField'
import styles from './SelectArticleListFilters.module.scss'

interface SelectArticleSortProps {
  className?: string
}

export const SelectArticleListFilters = memo(
  ({ className }: SelectArticleSortProps) => {
    const { t } = useTranslation('articles')

    const dispatch = useAppDispatch()
    const order = useSelector(getSortedArticleListOrder)
    const sortField = useSelector(
      getSortedArticleListSortField
    )

    const orderOptions: SelectOption<SortOrder>[] = useMemo(
      () => [
        {
          value: SortOrder.ASC,
          label: t('Ascending'),
        },
        {
          value: SortOrder.DESC,
          label: t('Descending'),
        },
      ],
      [t]
    )

    const sortOptions: SelectOption<ArticleSortField>[] =
      useMemo(
        () => [
          {
            value: ArticleSortField.CREATED_AT,
            label: t('Date created'),
          },
          {
            value: ArticleSortField.TITLE,
            label: t('Title'),
          },
          {
            value: ArticleSortField.VIEWS,
            label: t('Views'),
          },
        ],
        [t]
      )

    const onChangeOrder = useCallback(
      (newOrder: SortOrder) => {
        dispatch(
          sortedArticleListActions.setOrder(newOrder)
        )
        dispatch(articlesPageActions.setPage(1))
        dispatch(fetchArticles({ replace: true }))
      },
      [dispatch]
    )

    const onChangeSortField = useCallback(
      (newSortField: ArticleSortField) => {
        dispatch(
          sortedArticleListActions.setSortField(
            newSortField
          )
        )
        dispatch(articlesPageActions.setPage(1))
        dispatch(fetchArticles({ replace: true }))
      },
      [dispatch]
    )

    return (
      <div
        className={classNames(
          styles.selectArticleSort,
          {},
          [className]
        )}
      >
        <Select
          options={sortOptions}
          label={t('Sort by')}
          onChange={onChangeSortField}
          value={sortField}
        />
        <Select
          options={orderOptions}
          label={t('Sort order')}
          onChange={onChangeOrder}
          value={order}
        />
      </div>
    )
  }
)

SelectArticleListFilters.displayName =
  'SelectArticleListFilters'
