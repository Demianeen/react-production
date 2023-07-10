import { ToggleFeature } from '@/shared/lib/features'
import { ArticleDetailsDeprecated } from './ArticleDetailsDeprecated/ArticleDetailsDeprecated'
import type { ArticleDetailsRedesignedProps } from './ArticleDetailsRedesigned/ArticleDetailsRedesigned'
import { ArticleDetailsRedesigned } from './ArticleDetailsRedesigned/ArticleDetailsRedesigned'

export interface ArticleDetailsProps {
  className?: string
}

export const ArticleDetails = (
  props: ArticleDetailsProps & ArticleDetailsRedesignedProps
) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<ArticleDetailsRedesigned {...props} />}
      off={<ArticleDetailsDeprecated {...props} />}
    />
  )
}
