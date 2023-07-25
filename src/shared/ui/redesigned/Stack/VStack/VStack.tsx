import type { ElementType, ForwardedRef } from 'react'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import { vStackDefaultValue } from '../lib/getVStackClassName'
import type { FlexPropsWithDefaultTag } from '../Flex/Flex'
import { Flex } from '../Flex/Flex'

type VStackProps<TTag extends ElementType> = Omit<
  FlexPropsWithDefaultTag<TTag>,
  'direction'
>

export const VStack = typedForwardRef(
  <TTag extends ElementType>(
    props: VStackProps<TTag>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return <Flex {...vStackDefaultValue} ref={ref} {...props} />
  }
)
