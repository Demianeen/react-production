import type { ReactNode } from 'react'
import { memo, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
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
import type { AsyncReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
// eslint-disable-next-line netliukh-demian-fsd-plugin/public-api-imports, netliukh-demian-fsd-plugin/layer-imports
import { getArticleStylesClassName } from '@/features/ArticleEditor/lib/getArticleStylesClassName/getArticleStylesClassName'
import { getDateText } from '@/shared/lib/getDateText/getDateText'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { sanitizeHTMLString } from '@/shared/lib/html/sanitize'
import { ArticleThumbnail } from '../../ArticleThumbnail/ArticleThumbnail'
import { useArticleDetailsData } from '../../../model/selectors/getArticleDetailsData/getArticleDetailsData'
import { articleDetailsReducer } from '../../../model/slice/articleDetailsSlice'
import { fetchArticleById } from '../../../model/services/fetchArticleById/fetchArticleById'
import styles from './ArticleDetailsDeprecated.module.scss'
import { useArticleDetailsError } from '../../../model/selectors/getArticleDetailsError/getArticleDetailsError'
import { useArticleDetailsIsLoading } from '../../../model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading'

interface ArticleDetailsDeprecatedProps {
  className?: string
  id: number
}

const reducers: AsyncReducersList = {
  articleDetails: articleDetailsReducer,
}

export const ArticleDetailsDeprecated = memo(
  ({ className, id }: ArticleDetailsDeprecatedProps) => {
    useDynamicModuleLoader(reducers)
    const { t } = useTranslation('article-details')
    const dispatch = useAppDispatch()
    const isLoading = useArticleDetailsIsLoading()
    const error = useArticleDetailsError()
    const article = useArticleDetailsData()

    const contentRef = useRef<HTMLDivElement>()

    useEffect(() => {
      dispatch(fetchArticleById(id))
    }, [dispatch, id])

    useEffect(() => {
      if (article?.contentHtmlString) {
        sanitizeHTMLString(article.contentHtmlString).then(
          (sanitizedHtmlString) => {
            if (contentRef.current) {
              contentRef.current.innerHTML = sanitizedHtmlString
            }
          },
        )
      }
    })

    let content: ReactNode

    if (isLoading) {
      content = (
        <>
          <ArticleThumbnail className={styles.thumbnail} isLoading />
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
          {article?.img && (
            <ArticleThumbnail
              src={article.img}
              className={styles.thumbnail}
            />
          )}
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
          {article?.createdAt && (
            <HStack gap={0.5}>
              <Icon color='primary' Svg={CalendarIcon} />
              <Text
                text={getDateText(new Date(article.createdAt), {
                  long: true,
                })}
                data-testid='ArticleDetails.createdAt'
              />
            </HStack>
          )}
          {/* {article?.blocks?.map(renderBlock)} */}
          <div
            className={classNamesNew(
              styles.content,
              getArticleStylesClassName(),
            )}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: article?.contentHtmlString ?? '',
            }}
          />
        </>
      )
    }

    return (
      <article
        className={classNames(styles.articleDetails, {}, [className])}
        data-testid='ArticleDetails'
      >
        {content}
      </article>
    )
  },
)

ArticleDetailsDeprecated.displayName = 'ArticleDetails'
