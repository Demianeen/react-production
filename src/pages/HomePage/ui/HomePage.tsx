import { memo } from 'react'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { ArticleDetails } from '@/entities/Article'
import styles from './HomePage.module.scss'

const HomePage = () => {
  return (
    <Page data-testid='HomePage'>
      <VStack maxWidth align='center'>
        <div className={styles.cardWrapper}>
          <ArticleDetails id={34} />
        </div>
      </VStack>
    </Page>
  )
}

export default memo(HomePage)
