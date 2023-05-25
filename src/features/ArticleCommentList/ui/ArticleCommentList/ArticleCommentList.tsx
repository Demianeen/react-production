import {
  memo,
  Suspense,
  useCallback,
  useEffect,
} from 'react'
import { useSelector } from 'react-redux'
import type { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { CommentList } from '@/entities/Comment'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { CommentForm } from '@/entities/CommentForm'
import { VStack } from '@/shared/ui/Stack'
import { CommentFormSkeleton } from '@/entities/CommentForm/ui/CommentForm/CommentFormSkeleton'
import { sendArticleComment } from '../../model/services/sendArticleComment/sendArticleComment'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleCommentListIsLoading } from '../../model/selectors/getArticleCommentListIsLoading/getArticleCommentListIsLoading'
import {
  articleCommentListReducer,
  getArticleCommentList,
} from '../../model/slice/articleCommentListSlice'

export interface ArticleCommentListProps {
  className?: string
  articleId: number
}

const reducers: ReducersList = {
  articleCommentList: articleCommentListReducer,
}

export const ArticleCommentList = memo(
  ({ className, articleId }: ArticleCommentListProps) => {
    useDynamicModuleLoader(reducers)

    const comments = useSelector(
      getArticleCommentList.selectAll
    )
    const isLoading = useSelector(
      getArticleCommentListIsLoading
    )
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
