import React, { useEffect } from 'react'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import {
  getUserIsInitialized,
  userActions,
} from 'entities/User'
import { AppRouter } from 'app/providers/router'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { SuspenseWithSpinner } from 'shared/ui/SuspenseWithSpinner/SuspenseWithSpinner'

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
      <SuspenseWithSpinner>
        <Navbar />
      </SuspenseWithSpinner>
      <div className='contentPage'>
        <SuspenseWithSpinner>
          <Sidebar />
        </SuspenseWithSpinner>
        {isUserInitialized && <AppRouter />}
      </div>
    </div>
  )
}

export default App
