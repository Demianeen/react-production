import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { ListFiltersView } from '@/entities/ListFilters'
import { useArticleView } from '../../lib/useArticleView'

export interface ArticleViewSelectorContainerProps {
  className?: string
}

export const ArticleViewSelectorContainer = typedMemo(
  ({ className }: ArticleViewSelectorContainerProps) => {
    const viewProps = useArticleView()

    return <ListFiltersView className={className} {...viewProps} />
  }
)
