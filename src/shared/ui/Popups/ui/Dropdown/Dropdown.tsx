import { Menu } from '@headlessui/react'
import type { ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { Direction } from '@/shared/types/ui'
import { mapDirection } from '../../const/mapDirection'
import { HStack } from '../../../Stack'
import {
  AppLink,
  AppLinkTheme,
} from '../../../AppLink/AppLink'
import { Button, ButtonTheme } from '../../../Button/Button'
import styles from './Dropdown.module.scss'
import popupStyles from '../../styles/Popup.module.scss'

interface DropdownItemButton {
  onClick: () => void
  href?: never
}

interface DropdownItemLink {
  href: string
  onClick?: never
}

export type DropdownItem = {
  label: string
  disabled?: boolean
} & (DropdownItemButton | DropdownItemLink)

interface DropdownProps {
  className?: string
  /* trigger is a Button */
  triggerChildren: ReactNode
  items: DropdownItem[]
  direction?: Direction
}

export const Dropdown = ({
  className,
  triggerChildren,
  items,
  direction = 'down-left',
}: DropdownProps) => {
  return (
    <Menu
      as='div'
      className={classNames(popupStyles.popup, {}, [
        className,
      ])}
    >
      <Menu.Button
        as={Button}
        type='button'
        theme={ButtonTheme.CLEAR}
        className={styles.btn}
      >
        {triggerChildren}
      </Menu.Button>
      <Menu.Items
        className={classNames(styles.items, {}, [
          mapDirection[direction],
        ])}
      >
        {items.map((item) => (
          <Menu.Item key={item.label}>
            {({ active, disabled }) => {
              const itemClassName = classNames(
                styles.item,
                {
                  [popupStyles.active]: active,
                  [popupStyles.disabled]: disabled,
                }
              )

              if (item.href !== undefined) {
                return (
                  <HStack
                    as={AppLink}
                    to={item.href}
                    theme={
                      active
                        ? AppLinkTheme.INVERTED
                        : AppLinkTheme.PRIMARY
                    }
                    className={itemClassName}
                  >
                    {item.label}
                  </HStack>
                )
              }

              return (
                <HStack
                  as={Button}
                  type='button'
                  theme={
                    active
                      ? ButtonTheme.CLEAR_INVERTED
                      : ButtonTheme.CLEAR
                  }
                  className={itemClassName}
                  onClick={item.onClick}
                >
                  {item.label}
                </HStack>
              )
            }}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}
