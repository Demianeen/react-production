import { ToggleFeature } from '@/shared/lib/features'
import { ArticleTextBlockComponentDeprecated } from './ArticleTextBlockComponentDeprecated/ArticleTextBlockComponentDeprecated'
import type { ArticleTextBlockComponentRedesignedProps } from './ArticleTextBlockComponentRedesigned/ArticleTextBlockComponentRedesigned'
import { ArticleTextBlockComponentRedesigned } from './ArticleTextBlockComponentRedesigned/ArticleTextBlockComponentRedesigned'

export interface ArticleTextBlockComponentProps {
  className?: string
}

export const ArticleTextBlockComponent = (
  props: ArticleTextBlockComponentProps &
    ArticleTextBlockComponentRedesignedProps
) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<ArticleTextBlockComponentRedesigned {...props} />}
      off={<ArticleTextBlockComponentDeprecated {...props} />}
    />
  )
}
