import type { ThunkConfig } from '@/app/providers/StoreProvider'
import type {
  AsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
} from '@reduxjs/toolkit'
import {
  createAsyncThunk,
  bindActionCreators,
} from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch/useAppDispatch'

export type BuildAsyncThunkReturnType<
  Returned,
  Arg,
  ErrorType,
  Thunk extends AsyncThunk<
    Returned,
    Arg,
    ThunkConfig<ErrorType>
  > = AsyncThunk<Returned, Arg, ThunkConfig<ErrorType>>
> = [() => Thunk, Thunk]

export const buildAsyncThunk = <Returned, Arg, ErrorType>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<
    Returned,
    Arg,
    ThunkConfig<ErrorType>
  >,
  options: AsyncThunkOptions<Arg, ThunkConfig<ErrorType>> = {}
): BuildAsyncThunkReturnType<Returned, Arg, ErrorType> => {
  const asyncThunk = createAsyncThunk(
    typePrefix,
    payloadCreator,
    options
  )

  const useAsyncThunk = () => {
    const dispatch = useAppDispatch()

    return useMemo(
      () => bindActionCreators(asyncThunk, dispatch),
      [dispatch]
    )
  }

  return [useAsyncThunk, asyncThunk]
}
