import { memo, useCallback, useEffect, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Toggle } from '@/shared/ui/redesigned/Toggle'
import { useTranslation } from 'react-i18next'
import GridIcon from '@/shared/assets/icons/redesigned/grid.svg'
import ListIcon from '@/shared/assets/icons/redesigned/burger.svg'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { View } from '../../../model/const/view'
import styles from './SelectViewRedesigned.module.scss'

export interface SelectViewRedesignedProps {
  className?: string
  onChangeView: (view: View) => void
  view?: View
  showLabel?: boolean
}

export const SelectViewRedesigned = memo(
  ({
    className,
    onChangeView,
    view,
    showLabel = false,
  }: SelectViewRedesignedProps) => {
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
      <div className={classNames(styles.view, {}, [className])}>
        <Toggle
          enabled={enabled}
          setEnabled={onSetEnabled}
          screenReaderText={t('Enable grid view')}
          onContent={gridIcon}
          offContent={listIcon}
          tooltipText={t('Toggle list/grid view')}
          label={showLabel ? 'Toggle list view' : undefined}
        />
      </div>
    )
  }
)

SelectViewRedesigned.displayName = 'SelectView'
