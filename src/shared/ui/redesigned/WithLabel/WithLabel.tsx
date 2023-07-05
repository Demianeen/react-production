import type { LabelHTMLAttributes, ReactNode } from 'react'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { FlexDirection } from '../Stack'
import { Flex } from '../Stack'
import styles from './WithLabel.module.scss'

type HTMLLabelProps = Omit<
  LabelHTMLAttributes<HTMLLabelElement>,
  'value'
>

interface WithLabelProps extends HTMLLabelProps {
  label?: string
  className?: string
  children: ReactNode
  wrapperClassName?: string
  maxWidth?: boolean
  /**
   * Flex direction of wrapper
   * @default 'column'
   */
  direction?: FlexDirection
}

export const WithLabel = memo(
  ({
    className,
    wrapperClassName,
    label,
    children,
    maxWidth,
    direction = 'column',
    ...props
  }: WithLabelProps) => {
    return (
      <Flex
        className={wrapperClassName}
        gap={0.5}
        maxWidth={maxWidth}
        direction={direction}
      >
        {label && (
          <label
            htmlFor={label}
            className={classNames(styles.label, {}, [className])}
            {...props}
          >
            {label}:{' '}
          </label>
        )}
        {children}
      </Flex>
    )
  }
)

WithLabel.displayName = 'WithLabel'
