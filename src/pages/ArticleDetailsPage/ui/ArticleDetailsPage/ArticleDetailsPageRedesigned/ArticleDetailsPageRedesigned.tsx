import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { Button } from '@/shared/ui/redesigned/Button'
import { AppLink } from '@/shared/ui/deprecated/AppLink'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { routes } from '@/shared/lib/router/routes'
import { Title } from '@/shared/ui/redesigned/Title'
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { AdditionalInfoContainer } from '../../AdditionalInfoContainer/AdditionalInfoContainer'
import { DetailsContainer } from '../../DetailsContainer/DetailsContainer'
import { ArticleDetailsPageFooter } from '../../ArticleDetailsPageFooter/ArticleDetailsPageFooter'
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
      content={
        <Page
          className={classNamesNew(
            styles.articleDetailsPage,
            className
          )}
          data-testid='ArticleDetailsPage'
        >
          <DetailsContainer />
          <ArticleDetailsPageFooter articleId={numberId} />
        </Page>
      }
      right={<AdditionalInfoContainer />}
    />
  )
}

export default ArticleDetailsPageRedesigned
