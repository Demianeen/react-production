import { StoreProvider } from './ui/StoreProvider'
import type { AppDispatch } from './config/store'
import { createReduxStore } from './config/store'
import type {
  StateSchema,
  ThunkConfig,
} from './config/StateSchema'

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  AppDispatch,
  ThunkConfig,
}
