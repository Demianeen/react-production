import type { CSSProperties } from 'react'
import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Skeleton.module.scss'

interface SkeletonProps {
  className?: string
  height?: string
  width?: string
  borderRadius?: string
}

export const Skeleton = memo(
  ({
    className,
    height,
    width,
    borderRadius,
  }: SkeletonProps) => {
    const style: CSSProperties = {
      height,
      width,
      borderRadius,
    }

    return (
      <div
        className={classNames(styles.skeleton, {}, [
          className,
        ])}
        style={style}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
