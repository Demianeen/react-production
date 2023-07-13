import type { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import { useWindowScroll } from '@/shared/lib/scroll/useWindowScroll'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { ScrollToolbar } from './ScrollToolbar'

export default {
  title: 'widgets/ScrollToolbar',
  component: (props) => {
    const windowScroll = useWindowScroll()

    useEffect(() => {
      if (windowScroll) {
        windowScroll.scrollTop = 100
      }
    })

    return (
      <MainLayout
        toolbar={<ScrollToolbar {...props} />}
        content={<div style={{ height: '200vh' }} />}
        header={null}
        sidebar={null}
      />
    )
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof ScrollToolbar>

type Story = StoryObj<typeof ScrollToolbar>

export const Light: Story = {}
