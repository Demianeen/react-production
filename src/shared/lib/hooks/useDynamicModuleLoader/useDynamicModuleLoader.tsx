import { useEffect } from 'react'
import { useStore } from 'react-redux'
import type { ReduxStoreWithReducerManager } from 'app/providers/StoreProvider'
import type { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema'
import type { Reducer } from '@reduxjs/toolkit'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

export type ReducersList = Partial<
  Record<StateSchemaKey, Reducer>
>
type ReducerListEntry = [StateSchemaKey, Reducer]

interface DynamicModuleLoaderOptions {
  removeOnUnmount?: boolean
}

export const useDynamicModuleLoader = (
  reducers: ReducersList,
  {
    removeOnUnmount = true,
  }: DynamicModuleLoaderOptions = {}
) => {
  const dispatch = useAppDispatch()
  const store = useStore() as ReduxStoreWithReducerManager

  useEffect(() => {
    Object.entries(reducers).forEach(
      // @ts-expect-error TODO: fix this
      ([name, reducer]: ReducerListEntry) => {
        store.reducerManager.add(name, reducer)
        dispatch({
          type: `@INIT ${name} reducer`,
        })
      }
    )

    return () => {
      if (!removeOnUnmount) return
      Object.entries(reducers).forEach(
        // @ts-expect-error TODO: fix this
        ([name]: ReducerListEntry) => {
          store.reducerManager.remove(name)
          dispatch({
            type: `@DESTROY ${name} reducer`,
          })
        }
      )
    }
    // useEffect should be called only once when component is mounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
