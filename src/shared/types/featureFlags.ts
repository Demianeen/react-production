export interface FeatureFlagsOptions {
  isArticleRatingEnabled: boolean
  isArticleCreationEnabled: boolean
  isCounterEnabled: boolean
  isAppRedesigned: boolean
}

export type FeatureFlags = Partial<FeatureFlagsOptions>
