import type { ReactNode } from 'react'
import React from 'react'
import { Popover as HPopover } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { Direction } from '@/shared/types/ui'
import { Button, ButtonTheme } from '../../../Button'
import { mapDirection } from '../../const/mapDirection'
import styles from './Popover.module.scss'
import popupStyles from '../../styles/Popup.module.scss'

interface PopoverProps {
  className?: string
  maxWidth?: boolean
  readonly?: boolean
  children?: ReactNode
  /* trigger is a Button */
  triggerChildren: ReactNode
  direction?: Direction
}

export const Popover = ({
  className,
  children,
  readonly,
  maxWidth,
  triggerChildren,
  direction = 'down-left',
}: PopoverProps) => {
  return (
    <HPopover className={popupStyles.popup}>
      <HPopover.Button
        as={Button}
        type='button'
        theme={ButtonTheme.CLEAR}
        disabledButton={readonly}
        className={classNames(
          styles.button,
          {
            [popupStyles.maxWidth]: maxWidth,
          },
          [className]
        )}
      >
        {triggerChildren}
      </HPopover.Button>

      <HPopover.Panel
        className={classNames(styles.panel, {}, [
          mapDirection[direction],
        ])}
      >
        {children}
      </HPopover.Panel>
    </HPopover>
  )
}
