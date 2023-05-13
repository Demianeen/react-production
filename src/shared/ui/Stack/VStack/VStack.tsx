import React from 'react'
import type { ReactTag } from 'shared/types/ui'
import type { FlexProps } from '../Flex/Flex'
import { Flex } from '../Flex/Flex'

type VStackProps<TTag extends ReactTag> = Omit<
  FlexProps<TTag>,
  'direction'
>

export const VStack = <TTag extends ReactTag = 'div'>(
  props: VStackProps<TTag>
) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Flex direction='column' {...props} />
}
