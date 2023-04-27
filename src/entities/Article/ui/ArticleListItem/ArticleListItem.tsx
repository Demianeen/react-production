import React, { memo, useCallback, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import type { Article } from 'entities/Article'
import { Text } from 'shared/ui/Text/Text'
import { Icon } from 'shared/ui/Icon/Icon'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import { Card } from 'shared/ui/Card/Card'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import type { ArticleTextBlock } from '../../model/types/article'
import {
  ArticleBlockType,
  ArticleView,
} from '../../model/types/article'
import styles from './ArticleListItem.module.scss'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleView
}

export const ArticleListItem = memo(
  ({ className, view, article }: ArticleListItemProps) => {
    const { t } = useTranslation('articles')
    const navigate = useNavigate()

    const image = useMemo(
      () => (
        <img
          src={article.img}
          alt={article.title}
          className={styles.img}
        />
      ),
      [article.img, article.title]
    )

    const types = useMemo(
      () => (
        <Text
          text={article.types.join(', ')}
          className={styles.types}
        />
      ),
      [article.types]
    )

    const views = useMemo(
      () => (
        <>
          <Text
            text={String(article.views)}
            className={styles.views}
          />
          <Icon Svg={EyeIcon} />
        </>
      ),
      [article.views]
    )

    const onOpenArticle = useCallback(() => {
      navigate(RoutePath.article_details + article.id)
    }, [article.id, navigate])

    const textBlock = useMemo(() => {
      if (view === ArticleView.LIST) {
        return article.blocks.find(
          (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock | undefined
      }
      return undefined
    }, [article.blocks, view])

    if (view === ArticleView.LIST) {
      return (
        <Card
          className={classNames(
            styles.articleListItem,
            {},
            [className, styles[view]]
          )}
        >
          <header className={styles.header}>
            {article.user.avatar && (
              <Avatar
                size='2rem'
                src={article.user.avatar}
              />
            )}
            <Text
              text={article.user.username}
              className={styles.username}
            />
            <Text
              className={styles.date}
              text={article.createdAt}
            />
          </header>
          <Text
            title={article.title}
            className={styles.title}
          />
          {types}
          {image}
          {textBlock !== undefined && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={styles.textBlock}
            />
          )}
          <footer className={styles.footer}>
            <Button
              onClick={onOpenArticle}
              type='button'
              role='link'
            >
              {t('Read more...')}
            </Button>
            {views}
          </footer>
        </Card>
      )
    }

    return (
      <Card
        className={classNames(styles.articleListItem, {}, [
          className,
          styles[view],
        ])}
        onClick={onOpenArticle}
        role='link'
      >
        <div className={styles.imageWrapper}>
          {image}
          <Text
            text={article.createdAt}
            className={styles.date}
          />
        </div>
        <div className={styles.infoWrapper}>
          {types}
          {views}
        </div>
        <Text
          text={article.title}
          className={styles.title}
        />
      </Card>
    )
  }
)

ArticleListItem.displayName = 'ArticleListItem'
