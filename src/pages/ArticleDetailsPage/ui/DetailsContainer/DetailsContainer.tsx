import { ArticleDetails } from '@/entities/Article'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { Card } from '@/shared/ui/redesigned/Card'
import { useParams } from 'react-router-dom'

export interface DetailsContainerProps {
  className?: string
}

export const DetailsContainer = typedMemo(
  ({ className }: DetailsContainerProps) => {
    const { id } = useParams()
    const numberId = Number(id)

    return (
      <Card className={className}>
        <ArticleDetails id={numberId} />
      </Card>
    )
  }
)
