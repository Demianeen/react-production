import type { CSSProperties } from 'react'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import styles from './Skeleton.module.scss'

type SkeletonVariant = 'text' | 'rounded' | 'circular'
interface SkeletonPropsBase {
  className?: string
  /**
   * @description Border radius of skeleton
   */
  variant?: SkeletonVariant
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
  ({ className, ...props }: SkeletonProps) => {
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
        className={classNames(styles.skeleton, {}, [className])}
        style={style}
        aria-hidden
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
