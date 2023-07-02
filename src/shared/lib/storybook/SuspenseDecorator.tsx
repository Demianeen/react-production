import type { StoryFn } from '@storybook/react'
import { SuspenseWithSpinner } from '@/shared/ui/deprecated/SuspenseWithSpinner'

export const SuspenseDecorator = (StoryComponent: StoryFn) => (
  <SuspenseWithSpinner>
    <StoryComponent />
  </SuspenseWithSpinner>
)
