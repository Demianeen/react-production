import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import type { HTMLAttributes } from 'react'
import styles from './Title.module.scss'

type AvaliableTags = 'h1' | 'h2' | 'h3'
const defaultTagArray: AvaliableTags[] = ['h1', 'h2']

/* eslint-disable @typescript-eslint/naming-convention */
const mapLevel = {
  1: styles.level1,
  2: styles.level2,
}
/* eslint-enable @typescript-eslint/naming-convention */

export interface TitleProps
  extends HTMLAttributes<HTMLHeadingElement> {
  className?: string
  /**
   * Title can have two levels: 1 and 2. 1 is the biggest.
   * @default 2
   */
  level?: 1 | 2
  /**
   * @default level1 (h1), level2 (h2)
   */
  tag?: AvaliableTags
  children?: string
}

export const Title = typedMemo(
  ({ className, tag, level = 2, children, ...props }: TitleProps) => {
    const Tag = tag ?? defaultTagArray[level - 1]

    return (
      <Tag
        className={classNames(styles.title, {}, [
          className,
          mapLevel[level],
        ])}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)
