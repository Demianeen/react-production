import type { HTMLAttributes, ReactNode } from 'react'
import { memo } from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import styles from './Card.module.scss'

export enum CardTheme {
  FILLED = 'filled',
  OUTLINE = 'outline',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  /**
   * @description Card theme. Responsible for card's color and border.
   * @default CardTheme.FILLED
   */
  theme?: CardTheme
  /**
   * @description Flag to make card squared.
   */
  squared?: boolean
  padding?: 0 | 0.5 | 1 | 1.5
  /**
   * @description Flag to make card width 100%.
   */
  maxWidth?: boolean
}

const mapPadding = {
  0: styles.padding0,
  0.5: styles.padding0_5,
  1: styles.padding1,
  1.5: styles.padding1_5,
}

/**
 * Use components from redesigned folder
 * @deprecated
 */
export const Card = memo(
  ({
    className,
    children,
    theme = CardTheme.FILLED,
    squared = false,
    maxWidth = false,
    padding = 1,
    ...props
  }: CardProps) => {
    const mods: Mods = {
      [styles.border]: !squared,
      [styles.maxWidth]: maxWidth,
    }

    return (
      <article
        className={classNames(styles.card, mods, [
          className,
          styles[theme],
          mapPadding[padding],
        ])}
        {...props}
      >
        {children}
      </article>
    )
  },
)

Card.displayName = 'Card'
