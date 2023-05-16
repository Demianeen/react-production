import type {
  ComponentProps,
  ElementType,
  JSXElementConstructor,
  ReactNode,
} from 'react'

export type Direction =
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right'

export type ReactTag =
  | keyof JSX.IntrinsicElements
  | JSXElementConstructor<any>

export type Expand<T> = T extends infer O
  ? { [K in keyof O]: O[K] }
  : never

export type PropsOf<TTag extends ReactTag> =
  TTag extends ElementType
    ? Omit<ComponentProps<TTag>, 'ref'>
    : never

type PropsWeControl = 'as' | 'children' | 'className'

// Resolve the props of the component, but ensure to omit certain props that we control
export type CleanProps<
  TTag extends ReactTag,
  TOmitableProps extends PropertyKey = never
> = Omit<PropsOf<TTag>, TOmitableProps | PropsWeControl>

// Add certain props that we control
type OurProps<TTag extends ReactTag> = {
  as?: TTag
  children?: ReactNode
  refName?: string
}

// Provide clean TypeScript props, which exposes some of our custom API's.
export type Props<
  TTag extends ReactTag,
  TOmitableProps extends PropertyKey = never,
  Overrides extends object = object
> = CleanProps<TTag, TOmitableProps | keyof Overrides> &
  OurProps<TTag> &
  Overrides

export type WithDefaultTag<
  TTag extends ElementType | undefined,
  DefaultTag extends ElementType
> = TTag extends ElementType ? TTag : DefaultTag
