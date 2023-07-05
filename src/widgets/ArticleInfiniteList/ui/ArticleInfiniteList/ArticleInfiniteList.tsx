import { ToggleFeature } from '@/shared/lib/features'
import { ArticleInfiniteListDeprecated } from './ArticleInfiniteListDeprecated/ArticleInfiniteListDeprecated'
import type { ArticleInfiniteListRedesignedProps } from './ArticleInfiniteListRedesigned/ArticleInfiniteListRedesigned'
import { ArticleInfiniteListRedesigned } from './ArticleInfiniteListRedesigned/ArticleInfiniteListRedesigned'

export interface ArticleInfiniteListProps {
  className?: string
}

export const ArticleInfiniteList = ({
  ...props
}: ArticleInfiniteListProps & ArticleInfiniteListRedesignedProps) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<ArticleInfiniteListRedesigned {...props} />}
      off={<ArticleInfiniteListDeprecated {...props} />}
    />
  )
}
