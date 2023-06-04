import type {
  Dispatch,
  ThunkAction,
  SliceCaseReducers,
  CaseReducerActions,
} from '@reduxjs/toolkit'
import { bindActionCreators } from '@reduxjs/toolkit'

/**
 * Overload for bindActionCreators redux function, returns expects responses
 * from thunk actions
 */
export const typedBindActionCreators: <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string,
  M extends CaseReducerActions<
    CaseReducers,
    Name
  > = CaseReducerActions<CaseReducers, Name>
>(
  actionCreators: M,
  dispatch: Dispatch
) => {
  [N in keyof M]: M[N] extends ThunkAction<
    any,
    any,
    any,
    any
  >
    ? (
        ...args: Parameters<M[N]>
      ) => ReturnType<ReturnType<M[N]>>
    : M[N]
} = bindActionCreators
