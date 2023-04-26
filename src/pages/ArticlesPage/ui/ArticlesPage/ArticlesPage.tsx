// template-folder-name -> ArticlesPage.tsx
import { ArticleList, ArticleView } from 'entities/Article';
import { memo } from 'react';
import { classNames } from 'shared/libs';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = (props:ArticlesPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.articlesPage, {}, [className])}>
            <ArticleList
                isLoading
                view={ArticleView.BIG}
                articles={[]}
            />
        </div>
    );
};

export default memo(ArticlesPage);
