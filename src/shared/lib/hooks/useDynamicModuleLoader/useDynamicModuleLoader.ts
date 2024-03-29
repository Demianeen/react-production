import { useEffect } from 'react'
import { useStore } from 'react-redux'
import type { ReduxStoreWithReducerManager } from '@/app/providers/StoreProvider'
import type {
  AsyncReducersList,
  StateSchemaKey,
} from '@/app/providers/StoreProvider/config/stateSchema'
import { useAppDispatch } from '../useAppDispatch/useAppDispatch'

interface DynamicModuleLoaderOptions {
  removeOnUnmount?: boolean
}

export const useDynamicModuleLoader = (
  reducers: AsyncReducersList,
  { removeOnUnmount = true }: DynamicModuleLoaderOptions = {}
) => {
  const dispatch = useAppDispatch()
  const store = useStore() as ReduxStoreWithReducerManager

  useEffect(() => {
    const mountedReducers = store.reducerManager.getReducerMap()

    Object.entries(reducers).forEach(([name, reducer]) => {
      if (mountedReducers[name as StateSchemaKey]) return
      // init reducer only if it is not mounted yet
      store.reducerManager.add(
        // reducers list type had StateSchemaKey as a name
        name as StateSchemaKey,
        reducer
      )
      dispatch({
        type: `@INIT ${name} reducer`,
      })
    })

    return () => {
      if (!removeOnUnmount) return
      Object.entries(reducers).forEach(([name]) => {
        // reducers list type had StateSchemaKey as a name
        store.reducerManager.remove(name as StateSchemaKey)
        dispatch({
          type: `@DESTROY ${name} reducer`,
        })
      })
    }
    // useEffect should be called only once when component is mounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
