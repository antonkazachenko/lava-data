import React, { FC } from 'react';
import styles from './about.module.css';

const AboutComponent: FC = () => (
  <div>
    <div className={styles.mainText}>
      <h3>Overview</h3>
      <p>
        The Data Lava Lamp project is a visual tool for exploring AI training data, and
        especially for engaging with the seeming randomness and diversity of content in
        massive pre-training datasets. While the&quot;lava lamp&quot;component is meant
        to provide a unique view into training data, under the hood the project also allows
        for more traditional data visualization and for integration with various classifiers
        that categorize pieces of data (for instance, by &quot;job category of data creator&quot;).
      </p>
    </div>
    <a href="https://www.nickmvincent.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>
      <button type="button">
        <span>Link</span>
      </button>
    </a>
  </div>
);

export default AboutComponent;
