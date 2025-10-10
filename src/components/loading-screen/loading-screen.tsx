import React, { FC } from 'react';
import styles from './loading-screen.module.css';

const LoadingScreen: FC = () => (
  <div className={styles.loadingScreen}>
    <div className={styles.blobContainer}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
      <div className={`${styles.blob} ${styles.blob4}`} />
      <div className={`${styles.blob} ${styles.blob5}`} />
    </div>

    <div className={styles.content}>
      <h1 className={styles.logo}>LAVADATA</h1>
      <div className={styles.barContainer}>
        <div className={styles.barFill} />
      </div>
    </div>
  </div>
);

export default LoadingScreen;
