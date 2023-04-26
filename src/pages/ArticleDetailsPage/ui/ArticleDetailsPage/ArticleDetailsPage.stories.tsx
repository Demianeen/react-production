// template-folder-name -> ArticleDetailsPage.stories.tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { article } from 'shared/const/article';
import ArticleDetailsPage from './ArticleDetailsPage';

export default {
    title: 'pages/ArticleDetailsPage',
    component: ArticleDetailsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => <ArticleDetailsPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};

Normal.decorators = [StoreDecorator({
    articleDetails: { data: article },
    articleDetailsComments: {
        ids: ['1', '2', '3'],
        entities: {
            1: {
                id: '1',
                text: 'some comment',
                user: {
                    id: '1',
                    username: 'admin',
                    avatar: 'https://assets-global.website-files.com/60f0542421b57f4ec3190525/6104197948e0bced6ded4481_cybersecurity-1.png',
                },
            },
            2: {
                id: '2',
                text: 'some comment 2',
                user: {
                    id: '1',
                    username: 'admin',
                    avatar: 'https://assets-global.website-files.com/60f0542421b57f4ec3190525/6104197948e0bced6ded4481_cybersecurity-1.png',
                },
            },
            3: {
                id: '3',
                text: 'some comment 3',
                user: {
                    id: '1',
                    username: 'admin',
                    avatar: 'https://assets-global.website-files.com/60f0542421b57f4ec3190525/6104197948e0bced6ded4481_cybersecurity-1.png',
                },
            },
        },
    },
})];
