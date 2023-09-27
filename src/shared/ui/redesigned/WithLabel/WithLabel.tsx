import type {
  ElementType,
  LabelHTMLAttributes,
  ReactNode,
} from 'react'
import type { FlexDirection } from '../Stack'
import { Flex } from '../Stack'

type HTMLLabelProps = Omit<
  LabelHTMLAttributes<HTMLLabelElement>,
  'value'
>

interface WithLabelProps<TTag extends ElementType>
  extends HTMLLabelProps {
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
  as?: TTag
  /**
   * Adds asterisk to label
   */
  required: boolean
}

const DEFAULT_TAG = 'label'

export const WithLabel = <
  TTag extends ElementType = typeof DEFAULT_TAG,
>({
  className,
  wrapperClassName,
  label,
  children,
  maxWidth,
  direction = 'column',
  as,
  required = false,
  ...props
}: WithLabelProps<TTag>) => {
  const Tag = as ?? DEFAULT_TAG
  return (
    <Flex
      className={wrapperClassName}
      gap={0.5}
      maxWidth={maxWidth}
      direction={direction}
    >
      {label && (
        <Tag htmlFor={label} className={className} {...props}>
          {label}
          {required ? '*' : ''}:{' '}
        </Tag>
      )}
      {children}
    </Flex>
  )
}
