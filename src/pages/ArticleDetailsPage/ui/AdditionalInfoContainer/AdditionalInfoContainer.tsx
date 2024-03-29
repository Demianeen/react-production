import {
  useArticleDetailsData,
  useArticleDetailsIsLoading,
} from '@/entities/Article'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { Card } from '@/shared/ui/redesigned/Card'
import {
  ArticleAdditionalInfo,
  ArticleAdditionalInfoSkeleton,
} from '@/widgets/ArticleAdditionalInfo'
import { useParams } from 'react-router-dom'

export interface AdditionalInfoContainerProps {
  className?: string
}

export const AdditionalInfoContainer = typedMemo(
  ({ className }: AdditionalInfoContainerProps) => {
    const { id } = useParams()
    const article = useArticleDetailsData()
    const isLoading = useArticleDetailsIsLoading()

    if (isLoading) {
      return (
        <Card>
          <ArticleAdditionalInfoSkeleton />
        </Card>
      )
    }

    if (id === undefined || article === undefined) {
      return null
    }

    const numberId = Number(id)

    return (
      <Card>
        <ArticleAdditionalInfo
          className={className}
          id={numberId}
          article={article}
        />
      </Card>
    )
  }
)
