import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getCounter = (state: StateSchema) => state.counter;
