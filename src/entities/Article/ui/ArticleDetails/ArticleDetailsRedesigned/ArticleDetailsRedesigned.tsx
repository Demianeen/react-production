import type { ReactNode } from 'react'
import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Title } from '@/shared/ui/redesigned/Title'
import type { AsyncReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
import { renderArticleBlock } from './renderBlock'
import { articleDetailsReducer } from '../../../model/slice/articleDetailsSlice'
import { getArticleDetailsData } from '../../../model/selectors/getArticleDetailsData/getArticleDetailsData'
import { getArticleDetailsError } from '../../../model/selectors/getArticleDetailsError/getArticleDetailsError'
import { getArticleDetailsIsLoading } from '../../../model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading'
import { fetchArticleById } from '../../../model/services/fetchArticleById/fetchArticleById'
import styles from './ArticleDetailsRedesigned.module.scss'

export interface ArticleDetailsRedesignedProps {
  className?: string
  id: number
}

const reducers: AsyncReducersList = {
  articleDetails: articleDetailsReducer,
}

export const ArticleDetailsRedesigned = memo(
  ({ className, id }: ArticleDetailsRedesignedProps) => {
    useDynamicModuleLoader(reducers)
    const { t } = useTranslation('article-details')
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleDetailsIsLoading)
    const error = useSelector(getArticleDetailsError)
    const article = useSelector(getArticleDetailsData)

    useEffect(() => {
      dispatch(fetchArticleById(id))
    }, [dispatch, id])

    let content: ReactNode

    if (isLoading) {
      content = (
        <>
          <Skeleton variant='text' height='title' />
          <Skeleton variant='text' height='l2title' />
          <Skeleton
            className={styles.logo}
            width='45.75rem'
            height='26.25rem'
          />
          <Skeleton
            className={styles.skeletonTextBlock}
            width='68rem'
            height='14rem'
          />
          <Skeleton
            className={styles.skeletonTextBlock}
            width='68rem'
            height='14rem'
          />
        </>
      )
    } else if (error) {
      content = (
        <Title>{t('An error occurred while loading article')}</Title>
      )
    } else {
      content = (
        <>
          <Title level={1}>{article?.title}</Title>
          <Title>{article?.subtitle}</Title>
          <AppImage
            alt={article?.title ?? ''}
            src={article?.img}
            className={styles.logo}
            data-testid='ArticleDetails.logo'
            fallback={
              <Skeleton
                className={styles.logo}
                width='45.75rem'
                height='26.25rem'
              />
            }
          />

          {article?.blocks?.map(renderArticleBlock)}
        </>
      )
    }

    return (
      <VStack
        gap={1}
        className={classNames(styles.articleDetails, {}, [className])}
        data-testid='ArticleDetails'
      >
        {content}
      </VStack>
    )
  }
)

ArticleDetailsRedesigned.displayName = 'ArticleDetails'
