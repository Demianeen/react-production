import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { TabItem } from '@/shared/ui/deprecated/Tabs'
import { Tabs } from '@/shared/ui/deprecated/Tabs'
import { ArticleType } from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useArticleInfiniteListType } from '../../model/selectors/getArticleInfinteListType/getArticleInfiniteListType'
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles'
import { articleInfiniteListActions } from '../../model/slice/articleInfiniteListSlice'

interface ArticleInfiniteListTabsProps {
  className?: string
}

export const ArticleInfiniteListTabs = memo(
  ({ className }: ArticleInfiniteListTabsProps) => {
    const { t } = useTranslation('articles')
    const dispatch = useAppDispatch()

    const onChangeType = useCallback(
      (type: ArticleType) => {
        dispatch(articleInfiniteListActions.setType(type))
        dispatch(articleInfiniteListActions.setPage(1))
        dispatch(fetchArticles({ replace: true }))
      },
      [dispatch]
    )

    const tab = useArticleInfiniteListType()

    const tabs = useMemo<TabItem<ArticleType>[]>(
      () =>
        Object.values(ArticleType).map((value) => ({
          value,
          label: t(value),
        })),
      [t]
    )

    return (
      <Tabs
        tabs={tabs}
        value={tab}
        onTabClick={onChangeType}
        className={className}
      />
    )
  }
)

ArticleInfiniteListTabs.displayName = 'ArticleInfiniteListTabs'
