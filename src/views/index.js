import Load from '../services/async';
import LoadingView from './loading';

const options = {
    loading: LoadingView,
};

export const HomeView = Load('./home', options);
