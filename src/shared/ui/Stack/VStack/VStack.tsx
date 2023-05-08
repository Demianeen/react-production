import React from 'react'
import type { FlexProps } from '../Flex/Flex'
import { Flex } from '../Flex/Flex'

type HStackProps = Omit<FlexProps, 'direction'>

export const VStack = (props: HStackProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Flex direction='column' {...props} />
}
