import { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  getUserIsInitialized,
  useInitAuthData,
} from '@/entities/User'
import { PageLoader } from '@/widgets/PageLoader'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Sidebar } from '@/widgets/Sidebar'
import { Navbar } from '@/widgets/Navbar'
import { AppRouter } from '@/app/providers/router'
import { LoaderLayout } from '@/widgets/LoaderLayout'
import { ToggleFeature } from '@/shared/lib/features'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { useAppToolbar } from '@/app/lib/useAppToolbar'
import { withTheme } from '@/app/providers/ThemeProvider'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { DesktopViewport } from '@/shared/lib/components/Viewport'

const App = typedMemo(() => {
  const isUserInitialized = useSelector(getUserIsInitialized)
  const initAuthData = useInitAuthData()
  const toolbar = useAppToolbar()

  useEffect(() => {
    initAuthData()
  }, [initAuthData])

  if (!isUserInitialized) {
    return <LoaderLayout />
  }

  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={
        <div className='appRedesigned' id='app'>
          {/* for i18next */}
          <Suspense fallback={<PageLoader />}>
            <MainLayout
              header={<Navbar />}
              sidebar={<Sidebar />}
              content={<AppRouter />}
              toolbar={toolbar}
            />
          </Suspense>
        </div>
      }
      off={
        <div className='app' id='app'>
          <Suspense fallback={<PageLoader />}>
            <Navbar />
            <HStack>
              <DesktopViewport>
                <Sidebar />
              </DesktopViewport>
              <AppRouter />
            </HStack>
          </Suspense>
        </div>
      }
    />
  )
})

export default withTheme(App)
