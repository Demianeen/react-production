import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { ListFiltersView } from '@/entities/ListFilters'
import { useArticleView } from '../../lib/useArticleView'

export interface ArticleViewSelectorContainerProps {
  className?: string
  listRef: HTMLDivElement | null
}

export const ArticleViewSelectorContainer = typedMemo(
  ({ className, listRef }: ArticleViewSelectorContainerProps) => {
    const viewProps = useArticleView(listRef)

    return <ListFiltersView className={className} {...viewProps} />
  }
)
