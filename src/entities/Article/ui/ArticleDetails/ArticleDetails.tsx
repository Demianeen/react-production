import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Text,
  TextAlign,
  TextSize,
} from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg'
import { Icon } from 'shared/ui/Icon/Icon'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Button } from 'shared/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { getArticleDetailsIsLoading } from 'entities/Article/model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading'
import { getArticleDetailsError } from 'entities/Article/model/selectors/getArticleDetailsError/getArticleDetailsError'
import { getArticleDetailsData } from 'entities/Article/model/selectors/getArticleDetailsData/getArticleDetailsData'
import type { ArticleBlock } from '../../model/types/article'
import { ArticleBlockType } from '../../model/types/article'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import styles from './ArticleDetails.module.scss'

interface ArticleDetailsProps {
  className?: string
  id: number
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

export const ArticleDetails = memo(
  ({ className, id }: ArticleDetailsProps) => {
    useDynamicModuleLoader(reducers)
    const { t } = useTranslation('article-details')
    const dispatch = useAppDispatch()
    const isLoading = useSelector(
      getArticleDetailsIsLoading
    )
    const error = useSelector(getArticleDetailsError)
    const article = useSelector(getArticleDetailsData)

    const navigate = useNavigate()

    const renderBlock = useCallback(
      (block: ArticleBlock) => {
        switch (block.type) {
          case ArticleBlockType.CODE:
            return (
              <ArticleCodeBlockComponent
                key={block.id}
                className={styles.block}
                block={block}
              />
            )
          case ArticleBlockType.IMAGE:
            return (
              <ArticleImageBlockComponent
                key={block.id}
                className={styles.block}
                block={block}
              />
            )
          case ArticleBlockType.TEXT:
            return (
              <ArticleTextBlockComponent
                key={block.id}
                className={styles.block}
                block={block}
              />
            )
          default:
            return null
        }
      },
      []
    )

    useInitialEffect(() => dispatch(fetchArticleById(id)))

    const onBackToList = useCallback(() => {
      navigate(RoutePath.articles)
    }, [navigate])

    let content = null

    if (isLoading) {
      content = (
        <>
          <div className={styles.avatarWrapper}>
            <Skeleton
              className={styles.avatar}
              width='12.5rem'
              height='12.5rem'
              borderRadius='50%'
            />
          </div>
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
          title={t(
            'An error occurred while loading article'
          )}
          align={TextAlign.CENTER}
        />
      )
    } else {
      content = (
        <>
          {article?.img && (
            <div className={styles.avatarWrapper}>
              <Avatar size='12.5rem' src={article.img} />
            </div>
          )}
          <Text
            className={styles.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
          />
          <div className={styles.articleInfo}>
            <Icon className={styles.icon} Svg={EyeIcon} />
            <Text text={String(article?.views)} />
          </div>
          <div className={styles.articleInfo}>
            <Icon
              className={styles.icon}
              Svg={CalendarIcon}
            />
            <Text text={article?.createdAt} />
          </div>
          {article?.blocks.map(renderBlock)}
        </>
      )
    }

    return (
      <div
        className={classNames(styles.articleDetails, {}, [
          className,
        ])}
      >
        <Button
          type='button'
          role='link'
          onClick={onBackToList}
        >
          {t('Back to list')}
        </Button>
        {content}
      </div>
    )
  }
)

ArticleDetails.displayName = 'ArticleDetails'
