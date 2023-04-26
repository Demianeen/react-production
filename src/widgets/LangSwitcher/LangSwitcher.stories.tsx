import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/contexts/theme-context';
import { LangSwitcher } from './LangSwitcher';

export default {
    title: 'shared/LangSwitcher',
    component: LangSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LangSwitcher>;

const Template: ComponentStory<typeof LangSwitcher> = (args) => <LangSwitcher {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
