import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArticleDetails,
  useArticleDetailsAuthor,
} from '@/entities/Article'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'
import { Page } from '@/widgets/Page'
import { Button } from '@/shared/ui/deprecated/Button'
import { AppLink } from '@/shared/ui/deprecated/AppLink'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { routes } from '@/shared/lib/router/routes'
import { ArticleDetailsPageHeader } from '../../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { ArticleDetailsPageFooter } from '../../ArticleDetailsPageFooter/ArticleDetailsPageFooter'

interface ArticleDetailsPageDeprecatedProps {
  className?: string
}

const ArticleDetailsPageDeprecated = ({
  className,
}: ArticleDetailsPageDeprecatedProps) => {
  const { id } = useParams()
  const { t } = useTranslation('article-details')
  const author = useArticleDetailsAuthor()

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
      {author && (
        <ArticleDetailsPageHeader
          id={numberId}
          authorId={author.id}
        />
      )}
      <ArticleDetails id={numberId} />
      <ArticleDetailsPageFooter articleId={numberId} />
    </Page>
  )
}

export default memo(ArticleDetailsPageDeprecated)
