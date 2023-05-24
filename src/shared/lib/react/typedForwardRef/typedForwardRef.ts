import type {
  PropsWithoutRef,
  ReactElement,
  Ref,
  RefAttributes,
} from 'react'
import { forwardRef } from 'react'

export const typedForwardRef: <T, P = object>(
  render: (props: P, ref: Ref<T>) => ReactElement | null
) => (
  props: PropsWithoutRef<P> & RefAttributes<T>
) => ReactElement | null = forwardRef
