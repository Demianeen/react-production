import type { ReactNode } from 'react'
import React, { Fragment } from 'react'
import { Popover as HPopover } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { Direction } from '@/shared/types/ui'
import { mapDirection } from '../../const/mapDirection'
import styles from './Popover.module.scss'
import popupStyles from '../../styles/Popup.module.scss'

interface PopoverProps {
  className?: string
  children?: ReactNode
  /**
   * Trigger component, need to be wrapped into button
   */
  trigger: ReactNode
  /**
   * Direction of dropdown
   * @default 'down-left'
   */
  direction?: Direction
}

export const Popover = ({
  children,
  trigger,
  className,
  direction = 'down-left',
}: PopoverProps) => {
  return (
    <HPopover
      className={classNames(popupStyles.popup, {}, [className])}
    >
      <HPopover.Button as={Fragment}>{trigger}</HPopover.Button>

      <HPopover.Panel
        className={classNames(styles.panel, {}, [
          mapDirection[direction],
          popupStyles.menu,
        ])}
      >
        {children}
      </HPopover.Panel>
    </HPopover>
  )
}
