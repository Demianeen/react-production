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
import { routes } from '@/shared/lib/router/routes'
import { AppImage } from '@/shared/ui/AppImage'
import { Skeleton } from '@/shared/ui/Skeleton'
import type { TestProps } from '@/shared/types/tests'
import { ArticleBlockType } from '../../model/const/articleBlockType'
import type { OnOpenArticle } from '../ArticleList/VirtualizedArticleList'
import type {
  Article,
  ArticleTextBlock,
} from '../../model/types/article'
import styles from './ArticleListItem.module.scss'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

interface ArticleListItemProps extends TestProps {
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
    'data-testid': testId = 'ArticleListItem',
  }: ArticleListItemProps) => {
    const { t } = useTranslation('articles')

    const image = useMemo(
      () => (
        <AppImage
          src={article.img}
          alt={article.title}
          className={styles.img}
          fallback={<Skeleton className={styles.img} />}
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
          data-testid={`${testId}.List`}
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
                to={routes.articleDetails({
                  id: String(article.id),
                })}
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
        to={routes.articleDetails({
          id: String(article.id),
        })}
        target={target}
        onClick={onClick()}
        data-testid={`${testId}.Grid`}
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
