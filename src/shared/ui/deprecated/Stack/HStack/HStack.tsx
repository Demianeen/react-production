import type { ForwardedRef } from 'react'
import type { ReactTag } from '@/shared/types/ui'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import type { FlexProps } from '../Flex/Flex'
import { Flex } from '../Flex/Flex'

type HStackProps<TTag extends ReactTag> = Omit<
  FlexProps<TTag>,
  'direction'
>

/**
 * Use components from redesigned folder
 * @deprecated
 */
export const HStack = typedForwardRef(
  <TTag extends ReactTag = 'div'>(
    { align = 'center', ...props }: HStackProps<TTag>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Flex
        direction='row'
        align={align}
        ref={ref}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    )
  }
)
