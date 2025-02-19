import React, { FC } from 'react';
import styles from './background.module.css';

const Background: FC<object> = () => (
  <div className={styles.gradientBackground} />
);

export default Background;
