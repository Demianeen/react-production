import type { LabelHTMLAttributes, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '../../redesigned/Stack'
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
   * Adds asterisk to label
   */
  required: boolean
}

/**
 * Use components from redesigned folder
 * @deprecated
 */
export const WithLabel = ({
  className,
  wrapperClassName,
  label,
  children,
  maxWidth,
  required = false,
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
          {label}
          {required ? '*' : ''}:{' '}
        </label>
      )}
      {children}
    </VStack>
  )
}
