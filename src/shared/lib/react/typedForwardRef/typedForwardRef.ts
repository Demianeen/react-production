import type {
  PropsWithoutRef,
  ReactElement,
  Ref,
  RefAttributes,
} from 'react'
import { forwardRef } from 'react'

/**
 * @description typedForwardRef is a wrapper around React.forwardRef that allows you to pass generic types to the render function.
 * @template T, P
 * @type {<T, P={}>(render: React.ForwardRefRenderFunction<T, P>) => React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>}
 */
export const typedForwardRef: <T, P = object>(
  render: (props: P, ref: Ref<T>) => ReactElement | null
) => (
  props: PropsWithoutRef<P> & RefAttributes<T>
) => ReactElement | null = forwardRef
