import { lazy } from 'react';
import { lazyLoadingTimeout } from 'shared/libs';

export const MainPageAsync = lazy(() => lazyLoadingTimeout(import('./MainPage'), 1000));
