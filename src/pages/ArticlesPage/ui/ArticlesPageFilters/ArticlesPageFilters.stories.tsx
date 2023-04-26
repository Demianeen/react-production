// template-folder-name -> ArticlesPageFilters.stories.tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleSortField, ArticleType, ArticleView } from 'entities/Article';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ArticlesPageFilters } from './ArticlesPageFilters';

export default {
    title: 'pages/Article/ArticlesPageFilters',
    component: ArticlesPageFilters,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesPageFilters>;

const Template: ComponentStory<typeof ArticlesPageFilters> = (args) => <ArticlesPageFilters {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};

Normal.decorators = [StoreDecorator({
    articlesPage: {
        view: ArticleView.SMALL,
        isLoading: false,
        sort: ArticleSortField.CREATED,
        order: 'asc',
        search: '',
        type: ArticleType.ALL,
    },
})];
