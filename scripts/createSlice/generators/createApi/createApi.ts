import fs from 'fs'
import { resolveRoot } from '../../../../utils/resolveRoot'
import { capitalize } from '../../../../utils/capitalize'
import { rtkApiTemplate } from './templates/rtkApi.template'
import type { Layer } from '../../types/createSlice'

export const createApi = (
  layer: Layer,
  sliceName: string,
  apiName: string
) => {
  const resolveApiPath = (...segments: string[]) =>
    resolveRoot(
      'src',
      layer,
      capitalize(sliceName),
      'api',
      ...segments
    )

  const createApiStructure = () => {
    try {
      fs.mkdirSync(resolveApiPath())
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(
          `Failed to create api structure: ${e.message}`
        )
      }
      throw new Error('Unexpected error')
    }
  }

  const createRtkApi = () => {
    try {
      fs.writeFileSync(
        resolveApiPath(`${apiName}Api.ts`),
        rtkApiTemplate(apiName)
      )
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Failed to rtk api: ${e.message}`)
      }
      throw new Error('Unexpected error')
    }
  }

  createApiStructure()
  createRtkApi()
}
