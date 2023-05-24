import { Suspense, useEffect } from 'react'
import {
  getUserIsInitialized,
  userActions,
} from 'entities/User'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { PageLoader } from 'widgets/PageLoader'
import { HStack } from 'shared/ui/Stack'
import { Sidebar } from 'widgets/Sidebar'
import { Navbar } from 'widgets/Navbar'
import { AppRouter } from 'app/providers/router'

const App = () => {
  const dispatch = useAppDispatch()
  const isUserInitialized = useSelector(
    getUserIsInitialized
  )

  useEffect(() => {
    dispatch(userActions.setAuthDataFromLocalStorage())
  }, [dispatch])

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
