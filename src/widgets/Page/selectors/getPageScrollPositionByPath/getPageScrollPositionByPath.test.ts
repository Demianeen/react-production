import type { StateSchema } from 'app/providers/StoreProvider'
import { getPageScrollPositionByPath } from './getPageScrollPositionByPath'

describe('getPageScrollPositionByPath', () => {
  it('should return the scrollPositionByPath', () => {
    const state: DeepPartial<StateSchema> = {
      page: {
        scrollPosition: {
          articles: 100,
        },
      },
    }
    expect(
      getPageScrollPositionByPath(
        state as StateSchema,
        'articles'
      )
    ).toEqual(100)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getPageScrollPositionByPath(
        state as StateSchema,
        'articles'
      )
    ).toEqual(0)
  })
})
