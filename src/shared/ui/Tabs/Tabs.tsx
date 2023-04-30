import React, { useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { typedMemo } from 'shared/lib/typedMemo/typedMemo'
import { Card, CardTheme } from 'shared/ui/Card/Card'
import styles from './Tabs.module.scss'

export interface TabItem<T extends string> {
  value: T
  label: string
}

interface TabsProps<T extends string> {
  className?: string
  tabs: TabItem<T>[]
  value: T
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
      <div
        className={classNames(styles.tabs, {}, [className])}
      >
        {tabs.map((tab) => (
          <Card
            key={tab.value}
            onClick={onClick(tab.value)}
            role='tab'
            theme={
              value === tab.value
                ? CardTheme.DEFAULT
                : CardTheme.OUTLINE
            }
            className={styles.tab}
          >
            {tab.label}
          </Card>
        ))}
      </div>
    )
  }
)
