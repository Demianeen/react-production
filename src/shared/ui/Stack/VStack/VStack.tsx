import type { ReactTag } from 'shared/types/ui'
import { typedForwardRef } from 'shared/lib/react/typedForwardRef/typedForwardRef'
import type { ForwardedRef } from 'react'
import type { FlexProps } from '../Flex/Flex'
import { Flex } from '../Flex/Flex'

type VStackProps<TTag extends ReactTag> = Omit<
  FlexProps<TTag>,
  'direction'
>

export const VStack = typedForwardRef(
  <TTag extends ReactTag = 'div'>(
    props: VStackProps<TTag>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Flex direction='column' ref={ref} {...props} />
  }
)
