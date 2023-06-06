import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'
import { routes } from '@/shared/lib/router/routes'
import { AppRouter } from '@/app/providers/router'
import { screen } from '@testing-library/react'
import { UserRole } from '@/entities/User'

describe('AppRouter', () => {
  it('should render page', async () => {
    componentRender(<AppRouter />, {
      route: routes.about(),
    })

    const page = await screen.findByTestId('AboutPage')
    expect(page).toBeInTheDocument()
  })

  it('should redirect to the not found page when page not found', () => {
    componentRender(<AppRouter />, {
      route: '/ababababa',
    })

    const page = screen.getByTestId('NotFoundPage')
    expect(page).toBeInTheDocument()
  })

  it('should redirect unauthorized user to the home page', async () => {
    componentRender(<AppRouter />, {
      route: routes.profile({ id: '1' }),
    })

    const page = await screen.findByTestId('HomePage')
    expect(page).toBeInTheDocument()
  })

  it('should redirect unauthorized user from admin page to the home page', async () => {
    componentRender(<AppRouter />, {
      route: routes.adminPanel(),
    })

    const page = await screen.findByTestId('HomePage')
    expect(page).toBeInTheDocument()
  })

  it('should open the closed page to authorized user', async () => {
    componentRender(<AppRouter />, {
      route: routes.profile({ id: '1' }),
      preloadedState: {
        user: {
          _isInitialized: true,
          authData: {},
        },
      },
    })

    const page = await screen.findByTestId('ProfilePage')
    expect(page).toBeInTheDocument()
  })

  it('should redirect to the forbidden page (lacking role)', async () => {
    componentRender(<AppRouter />, {
      route: routes.adminPanel(),
      preloadedState: {
        user: {
          _isInitialized: true,
          authData: {
            roles: [UserRole.USER],
          },
        },
      },
    })

    const page = await screen.findByTestId('ForbiddenPage')
    expect(page).toBeInTheDocument()
  })

  it('should open admin page (role present)', async () => {
    componentRender(<AppRouter />, {
      route: routes.adminPanel(),
      preloadedState: {
        user: {
          _isInitialized: true,
          authData: {
            roles: [UserRole.ADMIN],
          },
        },
      },
    })

    const page = await screen.findByTestId('AdminPanelPage')
    expect(page).toBeInTheDocument()
  })
})
