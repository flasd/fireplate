import Load from '../services/async';
import LoadingView from './loading';

export const HomeView = Load({
    loader: () => import('./home'),
    loading: LoadingView,
});
