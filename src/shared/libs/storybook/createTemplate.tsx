import React, { FC, JSXElementConstructor } from 'react';
import { ComponentStory } from '@storybook/react';

export type TemplateProxy
    // eslint-disable-next-line no-undef
    <T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
    (template: ComponentStory<T>) => ComponentStory<T>;

export type TemplateCreator
    // eslint-disable-next-line no-undef
    <T, K extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
    (value: T) => TemplateProxy<K>;

// eslint-disable-next-line no-undef
export const createTemplate = <T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>>
    (templateProxies: TemplateProxy<T>[], Component: FC): ComponentStory<T> => {
    let Template: ComponentStory<any> = (args) => <Component {...args} />;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < templateProxies.length; i++) {
        const templateCreator = templateProxies[i];
        Template = templateCreator(Template);
    }

    return Template;
};

// description:https://ulbitv.ru/pl/teach/control/lesson/view?id=255897645&editMode=0&showAnswer=271523283#answer271523283
