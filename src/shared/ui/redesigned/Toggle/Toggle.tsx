import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { Switch } from '@headlessui/react'
import type { ReactNode } from 'react'
import { Button } from '../Button'
import { Typography } from '../Typography'
import styles from './Toggle.module.scss'

export interface ToggleProps {
  className?: string
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  screenReaderText: string
  onContent?: ReactNode
  offContent?: ReactNode
}

export const Toggle = typedMemo(
  ({
    className,
    enabled,
    setEnabled,
    screenReaderText,
    onContent = 'on',
    offContent = 'off',
  }: ToggleProps) => {
    return (
      <Switch
        as={Button}
        variant='clear'
        checked={enabled}
        onChange={setEnabled}
        className={classNames(styles.switch, {}, [className])}
      >
        <Typography variant='screenReaderOnly'>
          {screenReaderText}
        </Typography>
        <span
          aria-hidden='true'
          className={classNames(styles.switchOff, {
            [styles.enabled]: !enabled,
          })}
        >
          {offContent}
        </span>
        <span
          aria-hidden='true'
          className={classNames(styles.switchOn, {
            [styles.enabled]: enabled,
          })}
        >
          {onContent}
        </span>
      </Switch>
    )
  }
)
