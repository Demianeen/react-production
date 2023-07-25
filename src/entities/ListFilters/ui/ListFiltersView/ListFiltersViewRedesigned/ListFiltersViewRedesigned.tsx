import { memo, useCallback, useEffect, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Toggle } from '@/shared/ui/redesigned/Toggle'
import { useTranslation } from 'react-i18next'
import GridIcon from '@/shared/assets/icons/redesigned/grid.svg'
import ListIcon from '@/shared/assets/icons/redesigned/burger.svg'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { View } from '../../../model/const/view'
import styles from './ListFiltersViewRedesigned.module.scss'

export interface ListFiltersViewRedesignedProps {
  className?: string
  onChangeView: (view: View) => void
  view?: View
}

export const ListFiltersViewRedesigned = memo(
  ({
    className,
    onChangeView,
    view,
  }: ListFiltersViewRedesignedProps) => {
    const { t } = useTranslation()
    const [enabled, setEnabled] = useState(view === View.GRID)

    const onSetEnabled = useCallback(
      (newEnabled: boolean) => {
        setEnabled(newEnabled)
        onChangeView?.(newEnabled ? View.GRID : View.LIST)
      },
      [onChangeView]
    )

    useEffect(() => {
      setEnabled(view === View.GRID)
    }, [view])

    const listIcon = (
      <Icon
        Svg={ListIcon}
        disabled={enabled}
        clickable
        noWrapWithButton
      />
    )

    const gridIcon = (
      <Icon
        Svg={GridIcon}
        disabled={!enabled}
        clickable
        noWrapWithButton
      />
    )

    return (
      <div
        className={classNames(styles.listFiltersView, {}, [
          className,
        ])}
      >
        <Toggle
          enabled={enabled}
          setEnabled={onSetEnabled}
          screenReaderText={t('Enable grid view')}
          onContent={gridIcon}
          offContent={listIcon}
          tooltipText={t('Toggle list/grid view')}
        />
      </div>
    )
  }
)

ListFiltersViewRedesigned.displayName = 'ListFiltersView'
