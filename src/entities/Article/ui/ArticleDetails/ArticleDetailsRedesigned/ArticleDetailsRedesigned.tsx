import type { ReactNode } from 'react'
import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Title } from '@/shared/ui/redesigned/Title'
import type { AsyncReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
// eslint-disable-next-line netliukh-demian-fsd-plugin/public-api-imports, netliukh-demian-fsd-plugin/layer-imports
import { getArticleStylesClassName } from '@/widgets/ArticleEditor/lib/getArticleStylesClassName/getArticleStylesClassName'
import { Card } from '@/shared/ui/redesigned/Card'
import { useArticleDetailsData } from '../../../model/selectors/getArticleDetailsData/getArticleDetailsData'
import { articleDetailsReducer } from '../../../model/slice/articleDetailsSlice'
import { fetchArticleById } from '../../../model/services/fetchArticleById/fetchArticleById'
import styles from './ArticleDetailsRedesigned.module.scss'
import { useArticleDetailsError } from '../../../model/selectors/getArticleDetailsError/getArticleDetailsError'
import { useArticleDetailsIsLoading } from '../../../model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading'

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
    const isLoading = useArticleDetailsIsLoading()
    const error = useArticleDetailsError()
    const article = useArticleDetailsData()

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
          <Title level={1} data-testid='ArticleDetails.Title'>
            {article?.title}
          </Title>
          <Title data-testid='ArticleDetails.Subtitle'>
            {article?.subtitle}
          </Title>
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

          <div
            className={getArticleStylesClassName()}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: article?.contentHtmlString ?? '',
            }}
          />
        </>
      )
    }

    return (
      <VStack
        as={Card}
        gap={1}
        maxWidth
        className={classNames(styles.articleDetails, {}, [className])}
        data-testid='ArticleDetails'
      >
        {content}
      </VStack>
    )
  },
)

ArticleDetailsRedesigned.displayName = 'ArticleDetails'
