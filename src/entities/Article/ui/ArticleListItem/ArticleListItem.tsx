import type { HTMLAttributeAnchorTarget } from 'react'
import React, { memo, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import type { Article } from 'entities/Article'
import { Text } from 'shared/ui/Text/Text'
import { Icon } from 'shared/ui/Icon/Icon'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import { Card } from 'shared/ui/Card/Card'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button/Button'
import { View } from 'entities/View'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import type { ArticleTextBlock } from '../../model/types/article'
import { ArticleBlockType } from '../../model/types/article'
import styles from './ArticleListItem.module.scss'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

interface ArticleListItemProps {
  className?: string
  article: Article
  view: View
  target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = memo(
  ({
    className,
    view,
    article,
    target,
  }: ArticleListItemProps) => {
    const { t } = useTranslation('articles')

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

    const textBlock = useMemo(() => {
      if (view === View.LIST) {
        return article.blocks.find(
          (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock | undefined
      }
      return undefined
    }, [article.blocks, view])

    if (view === View.LIST) {
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
            <AppLink
              to={RoutePath.article_details + article.id}
              target={target}
            >
              {/* TODO: Button can't be inside link */}
              <Button type='button' role='link'>
                {t('Read more...')}
              </Button>
            </AppLink>
            {views}
          </footer>
        </Card>
      )
    }

    return (
      <AppLink
        to={RoutePath.article_details + article.id}
        target={target}
      >
        <Card
          className={classNames(
            styles.articleListItem,
            {},
            [className, styles[view]]
          )}
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
      </AppLink>
    )
  }
)

ArticleListItem.displayName = 'ArticleListItem'
