import type { HTMLAttributes, ReactNode } from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import styles from './Card.module.scss'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  /**
   * @description Flag to make card width 100%.
   */
  maxWidth?: boolean
  padding?: 0 | 1 | 1.5
}

/* eslint-disable @typescript-eslint/naming-convention */
const mapPadding = {
  0: styles.padding0,
  1: styles.padding1,
  1.5: styles.padding1_5,
}
/* eslint-enable @typescript-eslint/naming-convention */

export const Card = typedMemo(
  ({
    className,
    children,
    maxWidth = false,
    padding = 1.5,
    ...props
  }: CardProps) => {
    const mods: Mods = {
      [styles.maxWidth]: maxWidth,
    }

    return (
      <article
        className={classNames(styles.card, mods, [
          className,
          mapPadding[padding],
        ])}
        {...props}
      >
        {children}
      </article>
    )
  }
)
