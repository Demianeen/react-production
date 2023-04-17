import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = ({
  className,
}: ArticleDetailsPageProps) => {
  return (
    <div
      className={classNames(styles.articleDetailsPage, {}, [
        className,
      ])}
    />
  )
}

export default memo(ArticleDetailsPage)
