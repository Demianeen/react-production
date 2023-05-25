import type { StateSchema } from '@/app/providers/StoreProvider'
import HomeIcon from '@/shared/assets/icons/home-20-20.svg'
import AboutIcon from '@/shared/assets/icons/about-us-20-20.svg'
import ProfileIcon from '@/shared/assets/icons/profile-17-20.svg'
import ArticlesIcon from '@/shared/assets/icons/articles-20-20.svg'
import { RoutePath } from '@/shared/config/routeConfig/routePath'
import { getSidebarItems } from './getSidebarItems'

describe('getSidebarItems', () => {
  it('should work when user is logged', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: {
          id: 1,
        },
      },
    }
    expect(getSidebarItems(state as StateSchema)).toEqual([
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
        path: `${RoutePath.profile}1`,
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
    ])
  })

  it("should work when user isn't logged", () => {
    const state: DeepPartial<StateSchema> = {}

    // we need to get even authOnly items because we need to redirect from them
    expect(getSidebarItems(state as StateSchema)).toEqual([
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
        path: RoutePath.profile,
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
    ])
  })
})
