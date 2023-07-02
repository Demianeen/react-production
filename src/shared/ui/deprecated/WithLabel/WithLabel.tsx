import type { LabelHTMLAttributes, ReactNode } from 'react'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '../../Stack'
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
}

/**
 * Use components from redesigned folder
 * @deprecated
 */
export const WithLabel = memo(
  ({
    className,
    wrapperClassName,
    label,
    children,
    maxWidth,
    ...props
  }: WithLabelProps) => {
    return (
      <VStack className={wrapperClassName} maxWidth={maxWidth}>
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
      </VStack>
    )
  }
)

WithLabel.displayName = 'WithLabel'
