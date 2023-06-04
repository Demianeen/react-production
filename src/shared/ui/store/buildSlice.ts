import type {
  SliceCaseReducers,
  CreateSliceOptions,
} from '@reduxjs/toolkit/dist'
import { createSlice } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { typedBindActionCreators } from '@/shared/lib/react/typedBindActionCreators/typedBindActionCreators'

/**
 * @description create slice that automatically binds the actions to the dispatch function and returns them in a useActions hook.
 * @param {CreateSliceOptions<State, CaseReducers, Name>} options
 * @returns {Slice<State, CaseReducers, Name> & {useActions: () => {[N in keyof CaseReducerActions<CaseReducers, Name>]: CaseReducerActions<CaseReducers, Name>[N] extends ThunkAction<any, any, any, any> ? (<N>(...args: Parameters<CaseReducerActions<CaseReducers, Name>[N]>) => ReturnType<ReturnType<CaseReducerActions<CaseReducers, Name>[N]>>) : CaseReducerActions<CaseReducers, Name>[N]}}}
 */
export const buildSlice = <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
>(
  options: CreateSliceOptions<State, CaseReducers, Name>
) => {
  const slice = createSlice<State, CaseReducers, Name>(
    options
  )

  const useActions = () => {
    const dispatch = useAppDispatch()

    return useMemo(
      () =>
        typedBindActionCreators<State, CaseReducers, Name>(
          slice.actions,
          dispatch
        ),
      [dispatch]
    )
  }

  return {
    useActions,
    ...slice,
  }
}
