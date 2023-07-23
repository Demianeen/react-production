export interface _FeatureFlags {
  isArticleRatingEnabled: boolean
  isArticleCreationEnabled: boolean
  isCounterEnabled: boolean
  isAppRedesigned: boolean
}

export type FeatureFlags = Partial<_FeatureFlags>
