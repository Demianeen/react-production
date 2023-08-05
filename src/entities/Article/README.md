### Entity Article

Description: The article serves as a fundamental building block in our project, encompassing both individual articles and lists.

#### Public api

- Components

`ArticleDetails` - Information about article

`ArticleList` - List of articles

`VirtualizedArticleList` - Virtualized list of articles. Used for large lists and infinite scroll.

- Functions

`getArticleDetailsData` - selector that retrieves information about article

`useArticleDetailsData` - hook that wraps `getArticleDetailsData` with useSelector

`useArticleDetailsError` - hook that returns article details error or undefined if there is no error.

`useArticleDetailsIsLoading` - hook that returns if article details data is loading

`useArticleDetailsCanEdit` - hook that returns if user can edit opened article

`computeListItemsLimit` - computes width and height of the container and item and returns amount of items to render.

`useComputeListItemsLimit` - memoized `computeListItemsLimit`

- Const

`ArticleType` - Represents article type (e.g. IT, SCIENCE, ECONOMICS)

- Types

`Article` - Describes article

`ArticleDetailsSchema` - Describes redux store type for information about artilce

`OnOpenArticle` - Describes function that is created on article
