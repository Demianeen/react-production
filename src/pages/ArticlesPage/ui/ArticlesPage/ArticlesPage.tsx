// template-folder-name -> ArticlesPage.tsx
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/libs';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = (props:ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation('articles');

    return (
        <div className={classNames(cls.articlesPage, {}, [className])}>
            {t('article-page', { ns: 'articles' })}
        </div>
    );
};

export default memo(ArticlesPage);
