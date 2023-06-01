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
  /**
   * @description Flag to make card width 100%.
   */
  maxWidth?: boolean
}

export const Card = memo(
  ({
    className,
    children,
    theme = CardTheme.FILLED,
    squared = false,
    maxWidth = false,
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
        ])}
        {...props}
      >
        {children}
      </article>
    )
  }
)

Card.displayName = 'Card'
