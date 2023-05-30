import type { HTMLAttributeAnchorTarget } from 'react'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text'
import { Icon } from '@/shared/ui/Icon'
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import { Card } from '@/shared/ui/Card'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { View } from '@/entities/ListFilters'
import { AppLink } from '@/shared/ui/AppLink'
import { HStack, VStack } from '@/shared/ui/Stack'
import { RoutePath } from '@/shared/const/routePath'
import { ArticleBlockType } from '../../model/const/articleBlockType'
import type { OnOpenArticle } from '../ArticleList/VirtualizedArticleList'
import type {
  Article,
  ArticleTextBlock,
} from '../../model/types/article'
import styles from './ArticleListItem.module.scss'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

interface ArticleListItemProps {
  className?: string
  article: Article
  view: View
  target?: HTMLAttributeAnchorTarget
  onOpenArticle?: OnOpenArticle
  index?: number
}

export const ArticleListItem = memo(
  ({
    className,
    view,
    article,
    target,
    onOpenArticle,
    index = 0,
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

    const onClick = () => {
      return () => onOpenArticle?.({ article, index })
    }

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
          <VStack gap={1}>
            <HStack as='header' gap={0.5} maxWidth>
              {article.user.avatar && (
                <Avatar
                  size='2rem'
                  src={article.user.avatar}
                />
              )}
              <Text text={article.user.username} />
              <Text
                className={styles.date}
                text={article.createdAt}
              />
            </HStack>
            <Text title={article.title} />
            {types}
            {image}
            {textBlock !== undefined && (
              <ArticleTextBlockComponent
                block={textBlock}
                className={styles.textBlock}
              />
            )}
            <HStack
              as='footer'
              justify='between'
              className={styles.footer}
              maxWidth
            >
              <Button
                as={AppLink}
                role='link'
                to={RoutePath.article_details + article.id}
                target={target}
                onClick={onClick()}
              >
                {t('Read more...')}
              </Button>
              {views}
            </HStack>
          </VStack>
        </Card>
      )
    }

    return (
      <AppLink
        to={RoutePath.article_details + article.id}
        target={target}
        onClick={onClick()}
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
          <HStack className={styles.infoWrapper} maxWidth>
            {types}
            {views}
          </HStack>
          <Text
            text={article.title}
            textTitle={article.title}
            className={styles.title}
          />
        </Card>
      </AppLink>
    )
  }
)

ArticleListItem.displayName = 'ArticleListItem'
