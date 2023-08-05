### Entity User

Description: The user is the general entity for user.

#### Public api

- Functions

`userReducer` - Reducer for user.

`userActions` - Redux actions for user.

`useSaveJsonSettings` - Hook that returns function to save json settings.

`useInitAuthData` - Hook that returns function to init auth data.

`useJsonSettingOnUserInit` - Hook that used to get data from json settings on user init. It ensures that there won't be any jumps in state.

`useUserActions` - Hooks that returns all user actions that are wrapped in dispatch.

- Selectors

`getUserAuthData` - Selector that returns user auth data.

`useUserAuthData` - Hook that wraps `getUserAuthData` in useSelector.

`useUserIsInitialized` - Hook that returns is user state was initialized.

`getUserId` - Selector that returns user id.

`useUserId` - Hook that wraps `getUserId` in useSelector.

`useIsUserLogged` - Hook that returns is user logged.

`useUserRoles` - Hook that returns user roles.

`useIsUserAdmin` - Hook that returns is user admin.

`useIsUserManager` - Hook that returns is user manager.

`useUserJsonSettings` - Hook that returns is json settings.

- Const

`UserRole` - Describes user role (e.g. ADMIN, MANAGER, USER).

- Types

`UserSchema` - Describes redux store type for user.

`User` - Describes user.
