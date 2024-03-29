import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Icon } from '@/shared/ui/deprecated/Icon'
import GridIcon from '@/shared/assets/icons/deprecated/grid-24-24.svg'
import ListIcon from '@/shared/assets/icons/deprecated/list-24-24.svg'
import type { ViewType } from '../../../model/types/view'
import { View } from '../../../model/const/view'
import styles from './SelectViewDeprecated.module.scss'

interface SelectViewDeprecatedProps {
  className?: string
  onChangeView: (view: View) => void
  view?: View
}

export const viewTypes: ViewType[] = [
  {
    view: View.GRID,
    Icon: GridIcon,
  },
  {
    view: View.LIST,
    Icon: ListIcon,
  },
]

export const SelectViewDeprecated = memo(
  ({ className, onChangeView, view }: SelectViewDeprecatedProps) => {
    const onClick = useCallback(
      (newSelectView: View) => {
        return () => onChangeView?.(newSelectView)
      },
      [onChangeView]
    )

    return (
      <div className={classNames(styles.view, {}, [className])}>
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
              width={24}
              height={24}
            />
          </Button>
        ))}
      </div>
    )
  }
)

SelectViewDeprecated.displayName = 'SelectView'
