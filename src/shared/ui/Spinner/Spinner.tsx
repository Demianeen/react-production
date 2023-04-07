import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Spinner.module.scss'

interface SpinnerProps {
  className?: string
}

export const Spinner = memo(
  ({ className }: SpinnerProps) => {
    return (
      <div
        className={classNames(styles.ldsSpinner, {}, [
          className,
        ])}
      >
        {[...Array(12)].map((_, index) => (
          // because we won't change order in any way
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} />
        ))}
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'
