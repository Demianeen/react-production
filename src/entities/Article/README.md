### Entity Article

Description: The article serves as a fundamental building block in our project, encompassing both individual articles and lists.

#### Public api

- Components

`ArticleDetails` - Information about article

`ArticleList` - List of articles

`VirtualizedArticleList` - Virtualized list of articles. Used for large lists and infinite scroll.

- Functions

`getArticleDetailsData` - selector that retrieves information about article

`useComputeListItemsLimit` - computes width and height of the container and item and returns amount of items to render.

- Const

`ArticleType` - Represents article type (e.g. IT, SCIENCE, ECONOMICS)

- Types

`Article` - Describes article

`ArticleDetailsSchema` - Describes redux store type for information about artilce

`OnOpenArticle` - Describes function that is created on article
