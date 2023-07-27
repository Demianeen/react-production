import type { CSSProperties } from 'react'
import { memo } from 'react'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import styles from './Skeleton.module.scss'

type SkeletonVariant = 'text' | 'rounded' | 'circular'
export type SkeletonBackgroundColor = 'light' | 'normal'
interface SkeletonPropsBase {
  className?: string
  /**
   * @description Border radius of skeleton
   */
  variant?: SkeletonVariant
  /**
   * Skeleton bg color
   * @default 'light'
   */
  backgroundColor?: SkeletonBackgroundColor
}

interface SkeletonPropsVariantText extends SkeletonPropsBase {
  variant: 'text'
  /**
   * @default 100%
   */
  width?: string
  /**
   * @default 'text'
   */
  height?: 'text' | 'l2title' | 'title'
  /**
   * Multiplies height by the number of lines
   * @default 1
   */
  numberOfLines?: number
}

interface SkeletonPropsVariantRounded extends SkeletonPropsBase {
  variant?: 'rounded'
  /**
   * @default 0.5rem
   */
  height?: string
  /**
   * @default 100%
   */
  width?: string
}

interface SkeletonPropsVariantCircular extends SkeletonPropsBase {
  variant: 'circular'
  /**
   * Height and width of the skeleton
   * @default 2rem
   */
  size: string
}

export type SkeletonProps =
  | SkeletonPropsVariantText
  | SkeletonPropsVariantRounded
  | SkeletonPropsVariantCircular

export const Skeleton = memo(
  ({
    className,
    backgroundColor = 'light',
    ...props
  }: SkeletonProps) => {
    let style: CSSProperties
    if (props.variant === 'circular') {
      const { size = '2rem' } = props
      style = {
        height: size,
        width: size,
        borderRadius: '50%',
      }
    } else if (props.variant === 'text') {
      const { width, height = 'text', numberOfLines = 1 } = props

      style = {
        width,
        height: `calc(var(--font-line-${height}-redesigned) * ${numberOfLines})`,
        borderRadius: '0.5rem',
      }
    } else {
      const { width, height } = props

      style = {
        height,
        width,
        borderRadius: '1rem',
      }
    }

    return (
      <div
        className={classNamesNew(
          styles.skeleton,
          {},
          className,
          styles[backgroundColor]
        )}
        style={style}
        aria-hidden
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
