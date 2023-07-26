import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { Switch } from '@headlessui/react'
import type { ReactNode } from 'react'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { ToggleFeature, toggleFeature } from '@/shared/lib/features'
import { HStack } from '../Stack'
import { Skeleton as SkeletonDeprecated } from '../../deprecated/Skeleton'
import { Skeleton } from '../Skeleton'
import { Typography } from '../Typography'
import styles from './Toggle.module.scss'
import { TooltipButton } from '../TooltipButton'

export interface ToggleProps {
  className?: string
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  screenReaderText: string
  onContent?: ReactNode
  offContent?: ReactNode
  label?: string
  isLoading?: boolean
  /**
   * Tooltip text to show on hover
   * @default screenReaderText will be used.
   */
  tooltipText?: string
}

export const Toggle = typedMemo(
  ({
    className,
    enabled,
    setEnabled,
    screenReaderText,
    onContent = 'on',
    offContent = 'off',
    label,
    isLoading = false,
    tooltipText,
  }: ToggleProps) => {
    return (
      <Switch.Group as={HStack} gap={0.5}>
        {label && <Switch.Label>{`${label}: `}</Switch.Label>}
        {isLoading ? (
          <ToggleFeature
            name='isAppRedesigned'
            on={<Skeleton width='5rem' />}
            off={
              <SkeletonDeprecated width='5rem' borderRadius='2rem' />
            }
          />
        ) : (
          <Switch
            as={TooltipButton}
            variant='clear'
            checked={enabled}
            onChange={setEnabled}
            className={classNamesNew(
              toggleFeature({
                name: 'isAppRedesigned',
                on: () => styles.switch,
                off: () => styles.switchDeprecated,
              }),
              className
            )}
            tooltipText={
              label ? undefined : tooltipText ?? screenReaderText
            }
          >
            {!label && (
              <Typography variant='screenReaderOnly'>
                {screenReaderText}
              </Typography>
            )}
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
        )}
      </Switch.Group>
    )
  }
)
