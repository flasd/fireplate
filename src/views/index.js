import { asyncComponent } from 'react-async-component';

export const HomeView = asyncComponent({
    resolve: () => import('./home'),
});
