import type { Selector } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'
import type { StateSchema } from '@/app/providers/StoreProvider'
import { useSelector } from 'react-redux'
import type {
  GetParamsFromSelectors,
  ResultMemoized,
  SelectorArray,
  SelectorResultArray,
  ResultSelector,
} from './buildSelector.types'

/**
 * @description when more than one selector is passed, the last argument is the combiner
 * @template S, FR
 * @param {any} selectors
 * @returns {ResultMemoized<FR, S, (...args: SelectorResultArray<S>) => FR, GetParamsFromSelectors<S>>}
 */
export function buildSelector<FR, S extends SelectorArray>(
  ...selectors: [...S, (...args: SelectorResultArray<S>) => FR]
): ResultMemoized<
  FR,
  S,
  (...args: SelectorResultArray<S>) => FR,
  GetParamsFromSelectors<S>
>

/**
 * when only one selector is passed, the result is a selector
 * @template FR
 * @param {(state: StateSchema) => FR} selector
 * @returns {ResultSelector<FR>}
 */
export function buildSelector<FR>(
  selector: (state: StateSchema) => FR
): ResultSelector<FR>

export function buildSelector<FR, S extends SelectorArray>(
  ...selectors: [...S, (...args: SelectorResultArray<S>) => FR]
):
  | ResultMemoized<
      FR,
      S,
      (...args: SelectorResultArray<S>) => FR,
      GetParamsFromSelectors<S>
    >
  | ResultSelector<FR> {
  const combiner = selectors.length > 1 ? selectors.pop() : undefined
  let selector: Selector<StateSchema, FR>

  if (combiner !== undefined) {
    // @ts-expect-error problem with 'ExtractReturnType<S>'
    selector = createSelector(selectors, combiner)
  } else {
    selector = selectors[0] as Selector<StateSchema, FR>
  }

  const useSelectorHook = () => {
    return useSelector(selector)
  }

  return [useSelectorHook, selector]
}
