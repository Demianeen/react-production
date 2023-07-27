import { memo, Suspense, useCallback, useEffect } from 'react'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { CommentList } from '@/entities/Comment'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  CommentForm,
  CommentFormSkeleton,
} from '@/entities/CommentForm'
import { VStack } from '@/shared/ui/redesigned/Stack'
import type { AsyncReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
import { useSelector } from 'react-redux'
import { useArticleCommentListIsLoading } from '../../model/selectors/getArticleCommentListIsLoading/getArticleCommentListIsLoading'
import { sendArticleComment } from '../../model/services/sendArticleComment/sendArticleComment'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import {
  articleCommentListReducer,
  getArticleCommentList,
} from '../../model/slice/articleCommentListSlice'

export interface ArticleCommentListProps {
  className?: string
  articleId: number
}

const reducers: AsyncReducersList = {
  articleCommentList: articleCommentListReducer,
}

export const ArticleCommentList = memo(
  ({ className, articleId }: ArticleCommentListProps) => {
    useDynamicModuleLoader(reducers)

    const comments = useSelector(getArticleCommentList.selectAll)
    const isLoading = useArticleCommentListIsLoading()
    const dispatch = useAppDispatch()

    const onSendComment = useCallback(
      (commentBody: string) => {
        dispatch(sendArticleComment(commentBody))
      },
      [dispatch]
    )

    useEffect(() => {
      dispatch(fetchCommentsByArticleId(articleId))
    }, [articleId, dispatch])

    return (
      <VStack gap={1.25} maxWidth>
        <Suspense fallback={<CommentFormSkeleton />}>
          <CommentForm onSendComment={onSendComment} />
        </Suspense>
        <CommentList
          className={className}
          comments={comments}
          isLoading={isLoading}
        />
      </VStack>
    )
  }
)

ArticleCommentList.displayName = 'ArticleCommentList'
