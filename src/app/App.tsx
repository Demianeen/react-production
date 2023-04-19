import React, { Suspense, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import {
  getUserIsInitialized,
  userActions,
} from 'entities/User'
import { PageLoader } from 'widgets/PageLoader'
import { AppRouter } from 'app/providers/router'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'

const App = () => {
  const dispatch = useAppDispatch()
  const isUserInitialized = useSelector(
    getUserIsInitialized
  )

  useEffect(() => {
    dispatch(userActions.setAuthDataFromLocalStorage())
  }, [dispatch])

  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <div className='contentPage'>
          <Sidebar />
          {isUserInitialized && <AppRouter />}
        </div>
      </Suspense>
    </div>
  )
}

export default App
