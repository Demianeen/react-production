import { Menu } from '@headlessui/react'
import type { ReactNode } from 'react'
import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import type { Direction } from 'shared/types/ui'
import { HStack } from '../Stack'
import { AppLink, AppLinkTheme } from '../AppLink/AppLink'
import { Button, ButtonTheme } from '../Button/Button'
import styles from './Dropdown.module.scss'

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
  triggerChildren: ReactNode
  items: DropdownItem[]
  direction?: Direction
}

/* eslint-disable @typescript-eslint/naming-convention */
const mapDirection: Record<Direction, string> = {
  'up-right': `${styles.up}`,
  'up-left': `${styles.up} ${styles.left}`,
  'down-right': `${styles.down}`,
  'down-left': `${styles.down} ${styles.left}`,
}
/* eslint-enable @typescript-eslint/naming-convention */

export const Dropdown = ({
  className,
  triggerChildren,
  items,
  direction = 'down-left',
}: DropdownProps) => {
  return (
    <Menu
      as='div'
      className={classNames(styles.dropdown, {}, [
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
        className={classNames(styles.menu, {}, [
          mapDirection[direction],
        ])}
      >
        {items.map((item) => (
          <Menu.Item key={item.label}>
            {({ active, disabled }) => {
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
                    className={classNames(styles.item, {
                      [styles.active]: active,
                      [styles.disabled]: disabled,
                    })}
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
                  className={classNames(styles.item, {
                    [styles.active]: active,
                    [styles.disabled]: disabled,
                  })}
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
