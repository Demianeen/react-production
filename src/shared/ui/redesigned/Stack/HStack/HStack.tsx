import type { ElementType, ForwardedRef } from 'react'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import { hStackDefaultValue } from '../lib/getHStackClassName'
import type { FlexPropsWithDefaultTag } from '../Flex/Flex'
import { Flex } from '../Flex/Flex'

type HStackProps<TTag extends ElementType> = Omit<
  FlexPropsWithDefaultTag<TTag>,
  'direction'
>

export const HStack = typedForwardRef(
  <TTag extends ElementType>(
    props: HStackProps<TTag>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return <Flex {...hStackDefaultValue} ref={ref} {...props} />
  }
)
