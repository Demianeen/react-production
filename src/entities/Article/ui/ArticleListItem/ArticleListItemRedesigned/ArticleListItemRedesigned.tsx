import type {
  HTMLAttributeAnchorTarget,
  MouseEvent,
  MouseEventHandler,
} from 'react'
import { memo, useCallback, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import EyeIcon from '@/shared/assets/icons/redesigned/eye.svg'
import { View } from '@/entities/View'
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
import { useFocus } from '@/shared/lib/hooks/useFocus/useFocus'
import { useTab } from '@/shared/lib/hooks/useTab/useTab'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { getDateText } from '@/shared/lib/getDateText/getDateText'
import type { OnOpenArticle } from '../../ArticleList/VirtualizedArticleList'
import type { Article } from '../../../model/types/article'
import styles from './ArticleListItemRedesigned.module.scss'

export interface ArticleListItemRedesignedProps extends TestProps {
  className?: string
  article: Article
  view: View
  target?: HTMLAttributeAnchorTarget
  onOpenArticle?: OnOpenArticle
  index?: number
  tabIndex?: number
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
    tabIndex,
  }: ArticleListItemRedesignedProps) => {
    const { t } = useTranslation('articles')
    const vStackRef = useRef<HTMLDivElement>(null)
    const [isLinkFocused, bindFocus] = useFocus()
    const { isTabLastKey } = useTab()

    const image = useMemo(
      () => (
        <AppImage
          src={article.img}
          alt={article.title}
          className={styles.img}
          fallback={<Skeleton className={styles.img} />}
        />
      ),
      [article.img, article.title],
    )

    const views = useMemo(
      () => (
        <HStack gap={0.5}>
          <Icon Svg={EyeIcon} />
          <span data-testid={`${testId}.Views`}>{article.views}</span>
        </HStack>
      ),
      [article.views, testId],
    )

    const onClick = () => {
      return (e: MouseEvent) => {
        e.stopPropagation()
        return onOpenArticle?.({ article, index })
      }
    }

    const onFocus = useCallback(() => {
      if (!isTabLastKey) return
      vStackRef.current?.scrollIntoView()
    }, [isTabLastKey])

    // prevents button to become focused on click
    const onMouseDown: MouseEventHandler<HTMLAnchorElement> =
      useCallback((e) => {
        e.preventDefault()
      }, [])

    // TODO: Add ability to read first paragraph of article in list view
    if (view === View.LIST) {
      return (
        <VStack
          ref={vStackRef}
          gap={1}
          as={Card}
          className={classNames(styles.articleListItem, {}, [
            className,
            styles[view],
          ])}
          data-testid={`${testId}.List`}
          tabIndex={tabIndex}
        >
          <HStack as='header' gap={0.5} maxWidth>
            <Avatar
              size='2rem'
              src={article.user.avatar}
              user={article.user}
            />
            {getDateText(new Date(article.createdAt))}
          </HStack>
          <Title level={1} tag='h2'>
            {article.title}
          </Title>
          <Title level={2} tag='h3'>
            {article.subtitle}
          </Title>
          {image}
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
              onFocus={onFocus}
              onMouseDown={onMouseDown}
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
        tabIndex={tabIndex}
        {...bindFocus}
      >
        <Card
          className={classNamesNew(
            {
              [styles.focused]: isLinkFocused && isTabLastKey.current,
            },
            className,
            styles[view],
          )}
          padding={0}
        >
          {image}
          <div className={styles.textWrapper}>
            <Title level={2} tag='h2' className={styles.title}>
              {article.title}
            </Title>
            <HStack
              className={styles.infoWrapper}
              justify='between'
              maxWidth
            >
              <span className={styles.date}>
                {getDateText(new Date(article.createdAt))}
              </span>
              <span data-testid='ArticleListItem.Views'>{views}</span>
            </HStack>
            <HStack gap={0.25} className={styles.avatar}>
              <Avatar
                size='2rem'
                src={article.user.avatar}
                user={article.user}
                noWrapInLink
              />
            </HStack>
          </div>
        </Card>
      </AppLink>
    )
  },
)

ArticleListItemRedesigned.displayName = 'ArticleListItem'
