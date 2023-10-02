import { createSelector } from '@reduxjs/toolkit'
import type { StateSchema } from '@/app/providers/StoreProvider'
import { useSelector } from 'react-redux'
import type {
  GetParamsFromSelectors,
  ResultMemoized,
  SelectorArray,
  SelectorResultArray,
  ResultSelector,
  SingleSelector,
} from './reselect.types'

const isSingleSelector = <
  FR,
  ARGS extends unknown[],
  S extends SelectorArray
>(
  combiner:
    | ((...args: SelectorResultArray<S>) => FR)
    | SingleSelector<FR, ARGS>
    | S[number]
    | undefined,
  selectors:
    | [...S, (...args: SelectorResultArray<S>) => FR]
    | [SingleSelector<FR, ARGS>]
): selectors is [SingleSelector<FR, ARGS>] => combiner === undefined

/**
 * when only one selector is passed, the result is a selector
 * @template FR, ARGS
 * @param {(state: StateSchema) => FR} selector
 * @returns {ResultSelector<FR>}
 */
export function buildSelector<FR, ARGS extends unknown[]>(
  selector: SingleSelector<FR, ARGS>
): ResultSelector<FR, ARGS>

/**
 * @description when more than one selector is passed, the last argument is the combiner
 * @template S, FR
 * @param {[...S, (...args: SelectorResultArray<S>) => FR]} selectors
 * @returns {ResultMemoized<S, FR, (...args: SelectorResultArray<S>) => FR, GetParamsFromSelectors<S>>}
 */
export function buildSelector<FR, S extends SelectorArray>(
  ...selectors: [...S, (...args: SelectorResultArray<S>) => FR]
): ResultMemoized<
  S,
  FR,
  (...args: SelectorResultArray<S>) => FR,
  GetParamsFromSelectors<S>
>

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function buildSelector<
  FR,
  S extends SelectorArray,
  ARGS extends unknown[] | never
>(
  ...selectors:
    | [...S, (...args: SelectorResultArray<S>) => FR]
    | [SingleSelector<FR, ARGS>]
):
  | ResultMemoized<
      S,
      FR,
      (...args: SelectorResultArray<S>) => FR,
      GetParamsFromSelectors<S>
    >
  | ResultSelector<FR, ARGS> {
  const combiner = selectors.length > 1 ? selectors.pop() : undefined

  if (!isSingleSelector(combiner, selectors)) {
    const selector =
      // @ts-expect-error selectors.pop() not change type
      createSelector<SelectorArray, FR>(selectors, combiner)

    const useSelectorHook = (...args: GetParamsFromSelectors<S>) =>
      useSelector((state: StateSchema) => selector(state, ...args))

    // @ts-expect-error TODO: fix types
    return [useSelectorHook, selector]
  }

  const selector = selectors[0]
  const useSelectorHook = (...args: ARGS) =>
    useSelector((state: StateSchema) => selector(state, ...args))

  return [useSelectorHook, selector]
}
