import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import type { View } from '../model/types/view'
import { viewTypes } from '../model/types/view'
import styles from './SelectView.module.scss'

interface SelectViewProps {
  className?: string
  value: View
  onChangeView: (view: View) => void
}

export const SelectView = memo(
  ({ className, value, onChangeView }: SelectViewProps) => {
    const onClick = (view: View) => () => onChangeView(view)
    return (
      <div
        className={classNames(
          styles.articleSelectView,
          {},
          [className]
        )}
      >
        {viewTypes.map((viewType) => (
          <Button
            type='button'
            theme={ButtonTheme.CLEAR}
            onClick={onClick(viewType.view)}
            key={viewType.view}
            className={classNames(styles.view, {
              [styles.selected]: value === viewType.view,
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

SelectView.displayName = 'SelectView'
