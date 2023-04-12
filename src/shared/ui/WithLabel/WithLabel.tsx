import type { LabelHTMLAttributes, ReactNode } from 'react'
import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './WithLabel.module.scss'

type HTMLLabelProps = Omit<
  LabelHTMLAttributes<HTMLLabelElement>,
  'value'
>

interface WithLabelProps extends HTMLLabelProps {
  label?: string
  className?: string
  wrapperClassName?: string
  children: ReactNode
}

export const WithLabel = memo(
  ({
    className,
    wrapperClassName,
    label,
    children,
    ...props
  }: WithLabelProps) => {
    return (
      <div
        className={classNames(styles.container, {}, [
          wrapperClassName,
        ])}
      >
        {label && (
          <label
            htmlFor={label}
            className={classNames(styles.label, {}, [
              className,
            ])}
            {...props}
          >
            {label}:{' '}
          </label>
        )}
        {children}
      </div>
    )
  }
)

WithLabel.displayName = 'WithLabel'
