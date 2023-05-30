import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArticleDetails } from '@/entities/Article'
import { Text, TextTheme } from '@/shared/ui/Text'
import { Page } from '@/widgets/Page'
import { Button } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'
import { VStack } from '@/shared/ui/Stack'
import { RoutePath } from '@/shared/const/routePath'
import { ArticleDetailsPageFooter } from '../ArticleDetailsPageFooter/ArticleDetailsPageFooter'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = ({
  className,
}: ArticleDetailsPageProps) => {
  const { id } = useParams()
  const { t } = useTranslation('article-details')

  if (id === undefined) {
    return (
      <VStack
        maxHeight
        maxWidth
        justify='center'
        align='center'
      >
        <Text
          theme={TextTheme.ERROR}
          title={t('Article not found')}
        />
        <Button as={AppLink} to={RoutePath.articles}>
          {t('Back to list')}
        </Button>
      </VStack>
    )
  }

  const numberId = Number(id)

  return (
    <Page className={className}>
      <ArticleDetails id={numberId} />
      <ArticleDetailsPageFooter articleId={numberId} />
    </Page>
  )
}

export default memo(ArticleDetailsPage)
