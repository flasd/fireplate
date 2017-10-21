import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.scss';

export default function HomeView() {
    return (
        <div className={styles.container}>
            <Helmet>
                <title>React App - Home</title>
            </Helmet>
            HomeView
        </div>
    );
}
