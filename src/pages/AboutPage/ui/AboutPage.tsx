import { memo } from 'react'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { ArticleDetails } from '@/entities/Article'
import styles from './AboutPage.module.scss'

const AboutPage = memo(() => {
  return (
    <Page data-testid='AboutPage'>
      <VStack maxWidth align='center'>
        <div className={styles.cardWrapper}>
          <ArticleDetails id={35} />
        </div>
      </VStack>
    </Page>
  )
})

AboutPage.displayName = 'AboutPage'

export default AboutPage
