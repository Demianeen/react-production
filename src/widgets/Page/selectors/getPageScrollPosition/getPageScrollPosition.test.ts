import type { StateSchema } from 'app/providers/StoreProvider'
import { getPageScrollPosition } from './getPageScrollPosition'

describe('getPageScrollPosition', () => {
  it('should return the scrollPosition', () => {
    const state: DeepPartial<StateSchema> = {
      page: {
        scrollPosition: {
          articles: 100,
        },
      },
    }
    expect(
      getPageScrollPosition(state as StateSchema)
    ).toEqual({
      articles: 100,
    })
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getPageScrollPosition(state as StateSchema)
    ).toEqual(0)
  })
})
