import React from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.scss';

export default function Home() {
    return (
        <div className={styles.container}>
            <Helmet>
                <title>Home Route @ Fireplate App</title>
            </Helmet>
            <p className={styles.kindWords}>
                Here lies the future.
            </p>
        </div>
    );
}
