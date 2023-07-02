import { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  getUserIsInitialized,
  useInitAuthData,
} from '@/entities/User'
import { PageLoader } from '@/widgets/PageLoader'
import { HStack } from '@/shared/ui/Stack'
import { Sidebar } from '@/widgets/Sidebar'
import { Navbar } from '@/widgets/Navbar'
import { AppRouter } from '@/app/providers/router'
import { LoaderLayout } from '@/widgets/LoaderLayout'
import { ToggleFeature } from '@/shared/lib/features'
import { MainLayout } from '@/shared/layouts/MainLayout'

const App = () => {
  const isUserInitialized = useSelector(getUserIsInitialized)
  const initAuthData = useInitAuthData()

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
        <div className='appRedesigned'>
          {/* for i18next */}
          <Suspense fallback={<PageLoader />}>
            <MainLayout
              header={<Navbar />}
              sidebar={<Sidebar />}
              content={<AppRouter />}
            />
          </Suspense>
        </div>
      }
      off={
        <div className='app'>
          <Suspense fallback={<PageLoader />}>
            <Navbar />
            <HStack>
              <Sidebar />
              <AppRouter />
            </HStack>
          </Suspense>
        </div>
      }
    />
  )
}

export default App
