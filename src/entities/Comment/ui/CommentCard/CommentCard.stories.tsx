import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentCard } from './CommentCard';

export default {
    title: 'entities/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    comment: {
        id: '1',
        text: 'some comment',
        user: {
            id: '1',
            username: 'admin',
            avatar: 'https://assets-global.website-files.com/60f0542421b57f4ec3190525/6104197948e0bced6ded4481_cybersecurity-1.png',
        },
    },
};

export const Loading = Template.bind({});
Loading.parameters = {
    loki: {
        skip: true,
    },
};
Loading.args = {
    comment: {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'Vasya' },
    },
    isLoading: true,
};
