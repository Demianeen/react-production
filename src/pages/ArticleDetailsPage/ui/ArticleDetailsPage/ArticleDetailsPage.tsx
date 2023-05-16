import React, { memo } from 'react'
import { ArticleDetails } from 'entities/Article'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'
import { Page } from 'widgets/Page/ui/Page/Page'
import { Button } from 'shared/ui/Button/Button'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { VStack } from 'shared/ui/Stack'
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
        <Text title={t('Article not found')} />
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
      <ArticleDetailsPageFooter id={numberId} />
    </Page>
  )
}

export default memo(ArticleDetailsPage)
