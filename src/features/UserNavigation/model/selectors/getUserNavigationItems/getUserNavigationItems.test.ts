import type { StateSchema } from '@/app/providers/StoreProvider'
import HomeIcon from '@/shared/assets/icons/deprecated/home-20-20.svg'
import AboutIcon from '@/shared/assets/icons/deprecated/about-us-20-20.svg'
import ProfileIcon from '@/shared/assets/icons/deprecated/profile-17-20.svg'
import ArticlesIcon from '@/shared/assets/icons/deprecated/articles-20-20.svg'
import { routes } from '@/shared/lib/router/routes'
import { getUserNavigationItems } from './getUserNavigationItems'

describe('getSidebarItems', () => {
  it('should work when user is logged', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: {
          id: 1,
        },
      },
    }
    expect(getUserNavigationItems(state as StateSchema)).toEqual([
      {
        path: routes.home(),
        text: 'Home',
        Icon: HomeIcon,
      },
      {
        path: routes.about(),
        text: 'About us',
        Icon: AboutIcon,
      },
      {
        path: routes.profile({ id: '1' }),
        text: 'Profile',
        Icon: ProfileIcon,
        authOnly: true,
      },
      {
        path: routes.articles(),
        text: 'Articles',
        Icon: ArticlesIcon,
      },
    ])
  })

  it("should work when user isn't logged", () => {
    const state: DeepPartial<StateSchema> = {}

    // we need to get even authOnly items because we need to redirect from them
    expect(getUserNavigationItems(state as StateSchema)).toEqual([
      {
        path: routes.home(),
        text: 'Home',
        Icon: HomeIcon,
      },
      {
        path: routes.about(),
        text: 'About us',
        Icon: AboutIcon,
      },
      {
        path: routes.profile({ id: '' }),
        text: 'Profile',
        Icon: ProfileIcon,
        authOnly: true,
      },
      {
        path: routes.articles(),
        text: 'Articles',
        Icon: ArticlesIcon,
      },
    ])
  })
})
