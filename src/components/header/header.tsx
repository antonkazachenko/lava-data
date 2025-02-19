import React, { FC } from 'react';
import '../../index.css';
import { ReactComponent as GithubLogo } from '../../assets/images/githubLogo.svg';
import styles from './header.module.css';

const Header: FC<object> = () => (
  <header className={styles.headerFlex}>
    <div className={styles.navBar}>
      <nav className={styles.logo}>
        LAVADATA
      </nav>
      <div className={styles.separator} />
      <div className={styles.navMiddle}>
        <nav>
          Categories
        </nav>
        <nav>
          About
        </nav>
      </div>
      <div className={styles.separator} />
      <div className={styles.githubLogo}>
        <a href="https://github.com/antonkazachenko/lava-data" target="_blank" rel="noopener noreferrer">
          <GithubLogo />
        </a>
      </div>
    </div>
  </header>
);

export default Header;
