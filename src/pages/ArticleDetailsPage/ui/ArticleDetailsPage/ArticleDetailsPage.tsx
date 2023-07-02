import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArticleDetails } from '@/entities/Article'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'
import { Page } from '@/widgets/Page'
import { Button } from '@/shared/ui/deprecated/Button'
import { AppLink } from '@/shared/ui/deprecated/AppLink'
import { VStack } from '@/shared/ui/Stack'
import { routes } from '@/shared/lib/router/routes'
import { toggleFeature } from '@/shared/lib/features'
import { ArticleDetailsPageFooter } from '../ArticleDetailsPageFooter/ArticleDetailsPageFooter'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = ({
  className,
}: ArticleDetailsPageProps) => {
  const { id } = useParams()
  const { t } = useTranslation('article-details')

  toggleFeature({
    name: 'isCounterEnabled',
    on: () => console.log(`New counter${1}`),
    off: () => console.log('Old counter'),
  })

  if (id === undefined) {
    return (
      <VStack maxHeight maxWidth justify='center' align='center'>
        <Text
          theme={TextTheme.ERROR}
          title={t('Article not found')}
        />
        <Button as={AppLink} to={routes.articles()}>
          {t('Back to list')}
        </Button>
      </VStack>
    )
  }

  const numberId = Number(id)

  return (
    <Page className={className} data-testid='ArticleDetailsPage'>
      <ArticleDetails id={numberId} />
      <ArticleDetailsPageFooter articleId={numberId} />
    </Page>
  )
}

export default memo(ArticleDetailsPage)
