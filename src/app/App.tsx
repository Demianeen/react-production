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
    <div className='app'>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <HStack>
          <Sidebar />
          {isUserInitialized && <AppRouter />}
        </HStack>
      </Suspense>
    </div>
  )
}

export default App
