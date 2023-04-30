import React, { memo, useCallback } from 'react'
import type { View } from 'entities/View'
import { SelectView } from 'entities/View'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { getSortedArticleListView } from 'features/SortedArticlesList/model/selectors/getSortedArticleListView/getSortedArticleListView'
import { sortedArticleListActions } from '../../model/slice/sortedArticleListSlice'

interface SelectArticleViewProps {
  className?: string
}

export const SelectArticleListView = memo(
  ({ className }: SelectArticleViewProps) => {
    const dispatch = useAppDispatch()
    const selectedView = useSelector(
      getSortedArticleListView
    )

    const onChangeView = useCallback(
      (newView: View) => {
        dispatch(sortedArticleListActions.setView(newView))
      },
      [dispatch]
    )

    return (
      <SelectView
        onChangeView={onChangeView}
        value={selectedView}
        className={className}
      />
    )
  }
)

SelectArticleListView.displayName = 'SelectArticleListView'
