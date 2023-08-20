import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { useEffect } from 'react'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { ScrollToTopButton } from './ScrollToTopButton'

export default {
  title: 'features/ScrollToTopButton',
  component: () => {
    useEffect(() => {
      window.scrollTo({
        top: 100,
      })
    }, [])

    return (
      <MainLayout
        toolbar={null}
        content={<div style={{ height: '200vh' }} />}
        header={<ScrollToTopButton />}
        sidebar={null}
      />
    )
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  decorators: [StoreDecorator()],
} as Meta<typeof ScrollToTopButton>

type Story = StoryObj<typeof ScrollToTopButton>

export const Primary: Story = {}
