### Entity User

Description: The user is the general entity for user.

#### Public api

- Functions

`userReducer` - Reducer for user.

`userActions` - Redux actions for user.

- Selectors

`getUserAuthData` - Selector that returns user auth data.

`getUserIsInitialized` - Selector that returns is user state was initialized. 

`getUserId` - Selector that returns user id.

`getIsUserLogged` - Selector that returns is user logged.

`getUserRoles` - Selector that returns user roles.

`getIsUserAdmin` - Selector that returns is user admin.

`getIsUserManager` - Selector that returns is user manager.

- Const

`UserRole` - Describes user role (e.g. ADMIN, MANAGER, USER).

- Types

`UserSchema` - Describes redux store type for user.

`User` - Describes user.

