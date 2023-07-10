import type { HTMLAttributeAnchorTarget } from 'react'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import EyeIcon from '@/shared/assets/icons/deprecated/eye-20-20.svg'
import { View } from '@/entities/ListFilters'
import { routes } from '@/shared/lib/router/routes'
import type { TestProps } from '@/shared/types/tests'
import { Skeleton } from '@/shared/ui/deprecated/Skeleton'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Icon } from '@/shared/ui/deprecated/Icon'
import { Text } from '@/shared/ui/deprecated/Text'
import { AppLink } from '@/shared/ui/deprecated/AppLink'
import { Button } from '@/shared/ui/deprecated/Button'
import { Avatar } from '@/shared/ui/deprecated/Avatar'
import { Card } from '@/shared/ui/deprecated/Card'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { ArticleBlockType } from '../../../model/const/articleBlockType'
import type { OnOpenArticle } from '../../ArticleList/VirtualizedArticleList'
import type {
  Article,
  ArticleTextBlock,
} from '../../../model/types/article'
import styles from './ArticleListItemDeprecated.module.scss'
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent'

interface ArticleListItemDeprecatedProps extends TestProps {
  className?: string
  article: Article
  view: View
  target?: HTMLAttributeAnchorTarget
  onOpenArticle?: OnOpenArticle
  index?: number
}

export const ArticleListItemDeprecated = memo(
  ({
    className,
    view,
    article,
    target,
    onOpenArticle,
    index = 0,
    'data-testid': testId = 'ArticleListItem',
  }: ArticleListItemDeprecatedProps) => {
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
            data-testid={`${testId}.Views`}
          />
          <Icon Svg={EyeIcon} />
        </>
      ),
      [article.views, testId]
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
          className={classNames(styles.articleListItem, {}, [
            className,
            styles[view],
          ])}
          data-testid={`${testId}.List`}
        >
          <VStack gap={1}>
            <HStack as='header' gap={0.5} maxWidth>
              {article.user.avatar && (
                <Avatar size='2rem' src={article.user.avatar} />
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
          className={classNames(styles.articleListItem, {}, [
            className,
            styles[view],
          ])}
          role='link'
        >
          <div className={styles.imageWrapper}>
            {image}
            <Text text={article.createdAt} className={styles.date} />
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

ArticleListItemDeprecated.displayName = 'ArticleListItem'