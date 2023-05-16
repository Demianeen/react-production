import React, { useCallback } from 'react'
import { typedMemo } from 'shared/lib/react/typedMemo/typedMemo'
import { HStack } from '../Stack'
import { Button, ButtonTheme } from '../Button/Button'
import { Card, CardTheme } from '../Card/Card'
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
      <HStack className={className} gap={1.25}>
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
            <Button type='button' theme={ButtonTheme.CLEAR}>
              {tab.label}
            </Button>
          </Card>
        ))}
      </HStack>
    )
  }
)
