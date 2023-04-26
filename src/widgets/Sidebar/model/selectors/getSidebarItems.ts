import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import ArticleIcon from 'shared/assets/icons/article-20-20.svg';
import { routesPath } from 'app/providers/router';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: routesPath.main,
                Icon: MainIcon,
                text: 'Главная',
            },
            {
                path: routesPath.about,
                Icon: AboutIcon,
                text: 'О сайте',
            },
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: `${routesPath.profile}/${userData.id}`,
                    Icon: ProfileIcon,
                    text: 'Профиль',
                    authOnly: true,
                },
                {
                    path: routesPath.articles,
                    Icon: ArticleIcon,
                    text: 'Статьи',
                    authOnly: true,
                },
            );
        }

        return sidebarItemsList;
    },
);
