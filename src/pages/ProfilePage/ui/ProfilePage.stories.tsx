import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProfilePage from 'pages/ProfilePage/ui/ProfilePage';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/contexts/theme-context';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
    profile: {
        isLoading: false,
        data: {
            username: 'admin',
            age: 38,
            country: Country.Ukraine,
            lastname: 'maks',
            first: 'asd',
            city: 'asf',
            currency: Currency.USD,
        },
        form: {
            username: 'admin',
            age: 38,
            country: Country.Ukraine,
            lastname: 'maks',
            first: 'asd',
            city: 'asf',
            currency: Currency.USD,
        },
    },
    user: {},
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    profile: {
        isLoading: false,
        data: {
            username: 'admin',
            age: 38,
            country: Country.Ukraine,
            lastname: 'ulbi tv',
            first: 'asd',
            city: 'asf',
            currency: Currency.USD,
        },
        error: undefined,
        form: {
            username: 'admin',
            age: 38,
            country: Country.Ukraine,
            lastname: 'ulbi tv',
            first: 'asd',
            city: 'asf',
            currency: Currency.USD,
        },
    },
    user: {},
})];
