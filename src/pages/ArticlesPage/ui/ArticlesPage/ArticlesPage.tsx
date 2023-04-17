import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import styles from './ArticlesPage.module.scss'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const { t } = useTranslation('articles')
  return (
    <div
      className={classNames(styles.articlesPage, {}, [
        className,
      ])}
    >
      Articles page
    </div>
  )
}

export default memo(ArticlesPage)
