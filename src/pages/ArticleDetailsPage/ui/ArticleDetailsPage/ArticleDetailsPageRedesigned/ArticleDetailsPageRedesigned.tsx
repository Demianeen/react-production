import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { Button } from '@/shared/ui/redesigned/Button'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { routes } from '@/shared/lib/router/routes'
import { Title } from '@/shared/ui/redesigned/Title'
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleDetails } from '@/entities/Article'
import { ArticleDetailsPageFooter } from '../../ArticleDetailsPageFooter/ArticleDetailsPageFooter'
import { AdditionalInfoContainer } from '../../AdditionalInfoContainer/AdditionalInfoContainer'
import styles from './ArticleDetailsPageRedesigned.module.scss'

interface ArticleDetailsPageRedesignedProps {
  className?: string
}

const ArticleDetailsPageRedesigned = ({
  className,
}: ArticleDetailsPageRedesignedProps) => {
  const { id } = useParams()
  const { t } = useTranslation('article-details')

  if (id === undefined) {
    return (
      <VStack
        maxHeight
        maxWidth
        justify='center'
        align='center'
        gap={0.5}
      >
        <Title>{t('Article not found')}</Title>
        <Button as={AppLink} to={routes.articles()}>
          {t('Back to list')}
        </Button>
      </VStack>
    )
  }

  const numberId = Number(id)

  return (
    <StickyContentLayout
      layoutDisableWidth={1000}
      contentContainerClassName={styles.contentContainer}
      content={
        <Page
          className={classNamesNew(
            styles.articleDetailsPage,
            className
          )}
          data-testid='ArticleDetailsPage'
        >
          <Card>
            <ArticleDetails id={numberId} />
            <ArticleDetailsPageFooter articleId={numberId} />
          </Card>
        </Page>
      }
      right={<AdditionalInfoContainer />}
    />
  )
}

export default ArticleDetailsPageRedesigned
