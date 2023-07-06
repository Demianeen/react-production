import type { HTMLAttributeAnchorTarget } from 'react'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import EyeIcon from '@/shared/assets/icons/redesigned/eye.svg'
import { View } from '@/entities/ListFilters'
import { routes } from '@/shared/lib/router/routes'
import type { TestProps } from '@/shared/types/tests'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { Button } from '@/shared/ui/redesigned/Button'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Card } from '@/shared/ui/redesigned/Card'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Title } from '@/shared/ui/redesigned/Title'
import { ArticleBlockType } from '../../../model/const/articleBlockType'
import type { OnOpenArticle } from '../../ArticleList/VirtualizedArticleList'
import type {
  Article,
  ArticleTextBlock,
} from '../../../model/types/article'
import styles from './ArticleListItemRedesigned.module.scss'

export interface ArticleListItemRedesignedProps extends TestProps {
  className?: string
  article: Article
  view: View
  target?: HTMLAttributeAnchorTarget
  onOpenArticle?: OnOpenArticle
  index?: number
}

export const ArticleListItemRedesigned = memo(
  ({
    className,
    view,
    article,
    target,
    onOpenArticle,
    index = 0,
    'data-testid': testId = 'ArticleListItem',
  }: ArticleListItemRedesignedProps) => {
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
        <span className={styles.types}>
          {article.types.join(', ')}
        </span>
      ),
      [article.types]
    )

    const views = useMemo(
      () => (
        <HStack gap={0.5}>
          <Icon Svg={EyeIcon} />
          <span data-testid={`${testId}.Views`}>{article.views}</span>
        </HStack>
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
        <VStack
          gap={1}
          as={Card}
          className={classNames(styles.articleListItem, {}, [
            className,
            styles[view],
          ])}
          data-testid={`${testId}.List`}
        >
          <HStack as='header' gap={0.5} maxWidth>
            {article.user.avatar && (
              <Avatar size='2rem' src={article.user.avatar} />
            )}
            <b>{article.user.username}</b>
            {article.createdAt}
          </HStack>
          <Title level={1} tag='h2'>
            {article.title}
          </Title>
          <Title level={2} tag='h3'>
            {article.subtitle}
          </Title>
          {image}
          {textBlock !== undefined && (
            <p className={styles.textBlock}>
              {textBlock.paragraphs.slice(0, 2).join(' ')}
            </p>
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
            <span className={styles.date}>{article.createdAt}</span>
          </div>
          <HStack className={styles.infoWrapper} maxWidth>
            {types}
            {views}
          </HStack>
          <p className={styles.title}>{article.title}</p>
        </Card>
      </AppLink>
    )
  }
)

ArticleListItemRedesigned.displayName = 'ArticleListItem'
