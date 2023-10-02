import type { StoryFn } from '@storybook/react'

interface ParentDecoratorProps {
  parentWidth?: string
  parentHeight?: string
}

/* we sometimes need it for the elements that have a width=100% by default (e.g. ArticleItem grid view) */
export const ParentDecorator = ({
  parentWidth,
  parentHeight,
}: ParentDecoratorProps) => {
  return (StoryComponent: StoryFn) => (
    <div style={{ width: parentWidth, height: parentHeight }}>
      <StoryComponent />
    </div>
  )
}
