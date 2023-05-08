import React, { Suspense, useEffect } from 'react'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import {
  getUserIsInitialized,
  userActions,
} from 'entities/User'
import { AppRouter } from 'app/providers/router'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { PageLoader } from 'widgets/PageLoader'
import { HStack } from 'shared/ui/Stack'

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
