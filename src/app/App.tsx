import { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserIsInitialized, useUserActions } from '@/entities/User'
import { PageLoader } from '@/widgets/PageLoader'
import { HStack } from '@/shared/ui/Stack'
import { Sidebar } from '@/widgets/Sidebar'
import { Navbar } from '@/widgets/Navbar'
import { AppRouter } from '@/app/providers/router'

const App = () => {
  const isUserInitialized = useSelector(getUserIsInitialized)
  const { setAuthDataFromLocalStorage } = useUserActions()

  useEffect(() => {
    setAuthDataFromLocalStorage()
  }, [setAuthDataFromLocalStorage])

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
