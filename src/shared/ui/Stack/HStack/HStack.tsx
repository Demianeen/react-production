import React from 'react'
import type { ReactTag } from 'shared/types/ui'
import { typedForwardRef } from 'shared/lib/react/typedForwardRef/typedForwardRef'
import type { FlexProps } from '../Flex/Flex'
import { Flex } from '../Flex/Flex'

type HStackProps<TTag extends ReactTag> = Omit<
  FlexProps<TTag>,
  'direction'
>

export const HStack = typedForwardRef(
  <TTag extends ReactTag = 'div'>({
    align = 'center',
    ...props
  }: HStackProps<TTag>) => {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Flex direction='row' align={align} {...props} />
    )
  }
)
