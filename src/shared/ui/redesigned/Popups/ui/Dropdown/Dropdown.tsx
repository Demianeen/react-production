import { Menu } from '@headlessui/react'
import { Fragment, type ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { Direction } from '@/shared/types/ui'
import { mapDirection } from '../../const/mapDirection'
import { HStack } from '../../../Stack'
import { AppLink } from '../../../AppLink/AppLink'
import { Button } from '../../../Button/Button'
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
  /**
   * Trigger component, need to be wrapped into button
   */
  trigger: ReactNode
  /**
   * @description List of items to render in dropdown
   */
  items: DropdownItem[]
  /**
   * @description Direction of dropdown
   * @default 'down-left'
   */
  direction?: Direction
}

export const Dropdown = ({
  className,
  trigger,
  items,
  direction = 'down-left',
}: DropdownProps) => {
  return (
    <Menu
      as='div'
      className={classNames(popupStyles.popup, {}, [className])}
    >
      <Menu.Button as={Fragment}>{trigger}</Menu.Button>
      <Menu.Items
        className={classNames(styles.items, {}, [
          mapDirection[direction],
          popupStyles.menu,
        ])}
      >
        {items.map((item) => (
          <Menu.Item key={item.label}>
            {({ active, disabled }) => {
              const itemClassName = classNames(styles.item, {
                [popupStyles.active]: active,
                [popupStyles.disabled]: disabled,
              })

              if (item.href !== undefined) {
                return (
                  <HStack
                    as={AppLink}
                    to={item.href}
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
                  variant='clear'
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
