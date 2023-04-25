import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleView } from 'entities/Article'
import GridIcon from 'shared/assets/icons/grid-24-24.svg'
import ListIcon from 'shared/assets/icons/list-24-24.svg'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import styles from './ArticleSelectView.module.scss'

interface ArticleSelectViewProps {
  className?: string
  selectedView: ArticleView
  onChangeView: (view: ArticleView) => void
}

interface ViewType {
  view: ArticleView
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
}

const viewTypes: ViewType[] = [
  {
    view: ArticleView.GRID,
    Icon: GridIcon,
  },
  {
    view: ArticleView.LIST,
    Icon: ListIcon,
  },
]

export const ArticleSelectView = memo(
  ({
    className,
    selectedView,
    onChangeView,
  }: ArticleSelectViewProps) => {
    const onClick = (view: ArticleView) => () =>
      onChangeView(view)
    return (
      <div
        className={classNames(
          styles.articleSelectView,
          {},
          [className]
        )}
      >
        {viewTypes.map((viewType) => (
          <Button
            type='button'
            theme={ButtonTheme.CLEAR}
            onClick={onClick(viewType.view)}
            key={viewType.view}
            className={classNames(styles.view, {
              [styles.selected]:
                selectedView === viewType.view,
            })}
          >
            <Icon
              className={styles.icon}
              Svg={viewType.Icon}
            />
          </Button>
        ))}
      </div>
    )
  }
)

ArticleSelectView.displayName = 'ArticleSelectView'
