import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import type { View } from '../../model/types/view'
import { viewTypes } from '../../model/types/view'
import styles from './ListFiltersView.module.scss'

interface ListFiltersViewProps {
  className?: string
  onChangeView: (view: View) => void
  view?: View
}

export const ListFiltersView = memo(
  ({
    className,
    onChangeView,
    view,
  }: ListFiltersViewProps) => {
    const onClick = useCallback(
      (newView: View) => {
        return () =>
          // dispatch(listFiltersActions.setView(newView))
          onChangeView?.(newView)
      },
      [onChangeView]
    )

    return (
      <div
        className={classNames(styles.listFiltersView, {}, [
          className,
        ])}
      >
        {viewTypes.map((viewType) => (
          <Button
            type='button'
            theme={ButtonTheme.CLEAR}
            onClick={onClick(viewType.view)}
            key={viewType.view}
            className={classNames(styles.view, {
              [styles.selected]: view === viewType.view,
            })}
          >
            <Icon
              className={styles.icon}
              Svg={viewType.Icon}
            />
          </Button>
        ))}
      </div>
    )
  }
)

ListFiltersView.displayName = 'ListFiltersView'
