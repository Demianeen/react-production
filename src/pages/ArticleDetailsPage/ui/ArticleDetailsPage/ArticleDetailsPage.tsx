import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { ToggleFeature } from '@/shared/lib/features'
import ArticleDetailsPageDeprecated from './ArticleDetailsPageDeprecated/ArticleDetailsPageDeprecated'
import ArticleDetailsPageRedesigned from './ArticleDetailsPageRedesigned/ArticleDetailsPageRedesigned'

export interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = typedMemo(
  (props: ArticleDetailsPageProps) => {
    return (
      <ToggleFeature
        name='isAppRedesigned'
        on={<ArticleDetailsPageRedesigned {...props} />}
        off={<ArticleDetailsPageDeprecated {...props} />}
      />
    )
  }
)

export default ArticleDetailsPage
