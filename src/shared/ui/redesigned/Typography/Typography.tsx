import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import type { HTMLAttributes } from 'react'
import styles from './Typography.module.scss'

type AvaliableTags = 'p' | 'span'

export interface TypographyProps
  extends HTMLAttributes<HTMLParagraphElement> {
  className?: string
  /**
   * @default p
   */
  tag?: AvaliableTags
  children?: string
  /**
   * @description Change text color and size
   * @default default
   */
  variant?: 'default' | 'icon' | 'screenReaderOnly' | 'error'
  /**
   * Highlights text when you hover over it
   */
  clickable?: boolean
}

export const Typography = typedMemo(
  ({
    className,
    tag = 'p',
    children,
    variant = 'default',
    clickable = false,
    ...props
  }: TypographyProps) => {
    const Tag = tag

    return (
      <Tag
        className={classNames(
          styles.title,
          {
            [styles.clickable]: clickable,
          },
          [className, styles[variant]]
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)
