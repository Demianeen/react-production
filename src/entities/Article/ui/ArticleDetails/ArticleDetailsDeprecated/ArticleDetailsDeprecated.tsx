import type { ReactNode } from 'react'
import { memo, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import EyeIcon from '@/shared/assets/icons/deprecated/eye-20-20.svg'
import CalendarIcon from '@/shared/assets/icons/deprecated/calendar-20-20.svg'
import {
  Text,
  TextAlign,
  TextSize,
} from '@/shared/ui/deprecated/Text'
import { Skeleton } from '@/shared/ui/deprecated/Skeleton'
import { Icon } from '@/shared/ui/deprecated/Icon'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { articleDetailsReducer } from '../../../model/slice/articleDetailsSlice'
import { ArticleBlockType } from '../../../model/const/articleBlockType'
import { getArticleDetailsData } from '../../../model/selectors/getArticleDetailsData/getArticleDetailsData'
import { getArticleDetailsError } from '../../../model/selectors/getArticleDetailsError/getArticleDetailsError'
import { getArticleDetailsIsLoading } from '../../../model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading'
import { fetchArticleById } from '../../../model/services/fetchArticleById/fetchArticleById'
import type { ArticleBlock } from '../../../model/types/article'
import { ArticleCodeBlockComponent } from '../../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent'
import styles from './ArticleDetailsDeprecated.module.scss'

interface ArticleDetailsDeprecatedProps {
  className?: string
  id: number
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

export const ArticleDetailsDeprecated = memo(
  ({ className, id }: ArticleDetailsDeprecatedProps) => {
    useDynamicModuleLoader(reducers)
    const { t } = useTranslation('article-details')
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleDetailsIsLoading)
    const error = useSelector(getArticleDetailsError)
    const article = useSelector(getArticleDetailsData)

    const renderBlock = useCallback((block: ArticleBlock) => {
      switch (block.type) {
        case ArticleBlockType.CODE:
          return (
            <ArticleCodeBlockComponent
              key={block.id}
              className={styles.block}
              block={block}
              data-testid='ArticleDetails.CodeBlock'
            />
          )
        case ArticleBlockType.IMAGE:
          return (
            <ArticleImageBlockComponent
              key={block.id}
              className={styles.block}
              block={block}
              data-testid='ArticleDetails.ImageBlock'
            />
          )
        case ArticleBlockType.TEXT:
          return (
            <ArticleTextBlockComponent
              key={block.id}
              className={styles.block}
              block={block}
              data-testid='ArticleDetails.TextBlock'
            />
          )
        default:
          return null
      }
    }, [])

    useEffect(() => {
      dispatch(fetchArticleById(id))
    }, [dispatch, id])

    let content: ReactNode

    if (isLoading) {
      content = (
        <>
          <HStack justify='center' maxWidth>
            <Skeleton
              className={styles.avatar}
              width='12.5rem'
              height='12.5rem'
              borderRadius='50%'
            />
          </HStack>
          <Skeleton
            className={styles.title}
            width='41.8rem'
            height='2rem'
          />
          <Skeleton
            className={styles.skeletonTextBlock}
            width='25rem'
            height='2rem'
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
        <Text
          title={t('An error occurred while loading article')}
          align={TextAlign.CENTER}
        />
      )
    } else {
      content = (
        <>
          <HStack justify='center' maxWidth>
            <AppImage
              alt={article?.title ?? ''}
              src={article?.img}
              className={styles.logo}
              data-testid='ArticleDetails.logo'
            />
          </HStack>
          <Text
            className={styles.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
            data-testid='ArticleDetails'
          />
          <HStack gap={0.5}>
            <Icon color='primary' Svg={EyeIcon} />
            <Text
              text={String(article?.views)}
              data-testid='ArticleDetails.views'
            />
          </HStack>
          <HStack gap={0.5}>
            <Icon color='primary' Svg={CalendarIcon} />
            <Text
              text={article?.createdAt}
              data-testid='ArticleDetails.createdAt'
            />
          </HStack>
          {article?.blocks?.map(renderBlock)}
        </>
      )
    }

    return (
      <div
        className={classNames(styles.articleDetails, {}, [className])}
        data-testid='ArticleDetails'
      >
        {content}
      </div>
    )
  }
)

ArticleDetailsDeprecated.displayName = 'ArticleDetails'
