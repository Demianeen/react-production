import { useCallback } from 'react'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { HStack } from '../../redesigned/Stack'
import { Button, ButtonTheme } from '../Button'
import { Card, CardTheme } from '../Card'
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
}

export const Tabs = typedMemo(
  <T extends string>({
    className,
    tabs,
    onTabClick,
    value,
  }: TabsProps<T>) => {
    const onClick = useCallback(
      (tabValue: T) => {
        return () => onTabClick(tabValue)
      },
      [onTabClick]
    )

    return (
      <HStack
        className={classNamesNew(styles.tabs, className)}
        gap={1.25}
      >
        {tabs.map((tab) => (
          <Card
            key={tab.value}
            onClick={onClick(tab.value)}
            role='tab'
            theme={
              value === tab.value
                ? CardTheme.FILLED
                : CardTheme.OUTLINE
            }
            className={styles.tab}
          >
            <Button type='button' theme={ButtonTheme.CLEAR}>
              {tab.label}
            </Button>
          </Card>
        ))}
      </HStack>
    )
  }
)
