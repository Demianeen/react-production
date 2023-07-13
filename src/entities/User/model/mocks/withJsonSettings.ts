import type { JsonSettings } from '../types/jsonSettings'

export const withJsonSettings = (jsonSettings: JsonSettings) => ({
  user: {
    authData: {
      jsonSettings,
    },
  },
})
