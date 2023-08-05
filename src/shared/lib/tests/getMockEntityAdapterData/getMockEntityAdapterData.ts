import { getMockArray } from './getMockArray'
import { getMockEntities } from './getMockEntities'
import { getMockIds } from './getMockIds'

/**
 * Returns the object with the array, entities and ids properties. Used to generate mock data for the entity adapter.
 *
 * @param entity - The entity to be used as a template.
 * @param count - The number of entities to be generated.
 * @param page - The page number determines the start index of the array. The default value is 1.
 * @returns
 */
export const getMockEntityAdapterData = <T extends { id: number }>(
  entity: T,
  count: number,
  page?: number
) => {
  const array = getMockArray(entity, count, page)
  const entities = getMockEntities(array)
  const ids = getMockIds(array)

  return {
    array,
    entities,
    ids,
  }
}
