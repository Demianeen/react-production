import type { ElementType, ForwardedRef, ReactNode } from 'react'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import type {
  Props,
  WithDefaultTag,
} from '@/shared/types/asComponent'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import {
  getFlexClassName,
  type GetFlexClassNameProps,
} from '../lib/getFlexClassName'

export interface FlexOwnProps<TTag extends ElementType>
  extends GetFlexClassNameProps {
  className?: string
  children?: ReactNode
  /**
   * @description Tag name or component
   */
  as?: TTag
}

export type FlexProps<TTag extends ElementType> = Props<
  TTag,
  keyof FlexOwnProps<TTag>
> &
  FlexOwnProps<TTag>

const DEFAULT_TAG = 'div'

export type FlexPropsWithDefaultTag<
  TTag extends ElementType = typeof DEFAULT_TAG
> = FlexProps<WithDefaultTag<TTag, typeof DEFAULT_TAG>>

export const Flex = typedForwardRef(
  <TTag extends ElementType>(
    {
      className,
      children,
      justify = 'start',
      align = 'start',
      direction = 'row',
      wrap,
      gap,
      height,
      maxWidth = false,
      maxHeight = false,
      as,
      ...props
    }: FlexPropsWithDefaultTag<TTag>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const Tag = as ?? DEFAULT_TAG
    return (
      <Tag
        style={{ height }}
        className={classNamesNew(
          getFlexClassName({
            justify,
            align,
            direction,
            wrap,
            gap,
            maxWidth,
            maxHeight,
          }),
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)
