import { memo, useCallback } from 'react'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useSelector } from 'react-redux'
import { CommentList } from 'entities/Comment'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { CommentForm } from 'entities/CommentForm'
import { VStack } from 'shared/ui/Stack'
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

    useInitialEffect(() => {
      dispatch(fetchCommentsByArticleId(articleId))
    })

    return (
      <VStack gap={1.25} maxWidth>
        {/* we pass onSendComment here to make addCommentForm independent feature that can be used elsewhere. */}
        <CommentForm onSendComment={onSendComment} />
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
