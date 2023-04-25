import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from 'entities/User'
import HomeIcon from 'shared/assets/icons/home-20-20.svg'
import AboutIcon from 'shared/assets/icons/about-us-20-20.svg'
import ProfileIcon from 'shared/assets/icons/profile-17-20.svg'
import ArticlesIcon from 'shared/assets/icons/articles-20-20.svg'

import type { SidebarItemArgs } from 'widgets/Sidebar/model/types/sidebar'

import { RoutePath } from 'shared/config/routeConfig/routeConfig'

export const getSidebarItems = createSelector(
  getUserAuthData,
  (authData) => {
    const items: SidebarItemArgs[] = [
      {
        path: RoutePath.home,
        text: 'Home',
        Icon: HomeIcon,
      },
      {
        path: RoutePath.about,
        text: 'About us',
        Icon: AboutIcon,
      },
      {
        path: RoutePath.profile + (authData?.id ?? ''),
        text: 'Profile',
        Icon: ProfileIcon,
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        text: 'Articles',
        Icon: ArticlesIcon,
        authOnly: true,
      },
    ]
    return items
  }
)
