import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { SelectView } from '@/entities/View'
import { useArticleView } from '../../lib/useArticleView'

export interface ArticleViewSelectorContainerProps {
  className?: string
  listRef: HTMLDivElement | null
}

export const ArticleViewSelectorContainer = typedMemo(
  ({ className, listRef }: ArticleViewSelectorContainerProps) => {
    const viewProps = useArticleView(listRef)

    return <SelectView className={className} {...viewProps} />
  }
)
