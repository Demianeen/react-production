import { useCallback } from 'react'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import type { FlexDirection } from '../Stack'
import { Flex } from '../Stack'
import { Button } from '../Button'
import styles from './Tabs.module.scss'

export interface TabItem<T extends string> {
  value: T
  label: string
}

interface TabsProps<T extends string> {
  className?: string
  /**
   * @description The tabs to display
   */
  tabs: TabItem<T>[]
  value: T
  /**
   * @description Called when a tab is clicked
   * @param {T} value
   */
  onTabClick: (value: T) => void
  /**
   * Tabs direction. Row or column
   * @default 'row'
   */
  direction?: FlexDirection
}

export const Tabs = typedMemo(
  <T extends string>({
    className,
    tabs,
    onTabClick,
    value,
    direction = 'row',
  }: TabsProps<T>) => {
    const onClick = useCallback(
      (tabValue: T) => {
        return () => onTabClick(tabValue)
      },
      [onTabClick]
    )

    return (
      <Flex
        direction={direction}
        align={direction === 'row' ? 'center' : undefined}
        className={classNamesNew(styles.tabs, className)}
        gap={0.5}
      >
        {tabs.map((tab) => {
          const isSelected = tab.value === value
          return (
            <Button
              key={tab.value}
              type='button'
              variant={isSelected ? 'filled' : 'clear'}
              paddings='all'
              onClick={onClick(tab.value)}
              className={styles.tab}
            >
              {tab.label}
            </Button>
          )
        })}
      </Flex>
    )
  }
)
