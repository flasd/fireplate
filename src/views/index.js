import { asyncComponent } from 'react-async-component';

import styles from './index.scss';

export function LoadingComponent() {
    return (
        <div className={styles.loadingContainer} >
            Loading...
        </div>
    );
}
export function ErrorComponent({ error }) {
    return (
        <div className={styles.errorContainer} >
            { error.message }
        </div>
    );
}
export function getAsyncComponent(options) {
    return asyncComponent(Object.assign({}, {
        LoadingComponent,
        ErrorComponent,
    }, options));
}
export const HomeView = getAsyncComponent({
    // eslint-disable-next-line
    resolve: () => import('./home'),
});
