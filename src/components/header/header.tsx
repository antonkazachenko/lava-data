import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as GithubLogo } from '../../assets/images/githubLogo.svg';
import styles from './header.module.css';

const Header: FC<object> = () => (
  <header className={styles.headerFlex}>
    <div className={styles.navBar}>
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <NavLink to="/" replace className={`${styles.hoverText} ${styles.logo}`} data-text="LAVADATA">
        LAVADATA
      </NavLink>
      <div className={styles.separator} />
      <div className={styles.navMiddle}>
        <NavLink to="/" className={styles.hoverText} data-text="Categories">
          Categories
        </NavLink>
        <NavLink to="/about" className={styles.hoverText} data-text="About">
          About
        </NavLink>
      </div>
      <div className={styles.separator} />
      <div className={styles.githubLogo}>
        <a
          href="https://github.com/antonkazachenko/lava-data"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="18"
            height="21"
            viewBox="0 0 18 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="githubGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF9900" />
                <stop offset="100%" stopColor="#C31700" />
              </radialGradient>
            </defs>
            <g className={styles.solid}>
              <GithubLogo stroke="white" strokeWidth="1.5" />
            </g>
            <g className={styles.gradient}>
              <GithubLogo stroke="url(#githubGradient)" strokeWidth="1.5" />
            </g>
          </svg>

        </a>
      </div>
    </div>
  </header>
);

export default Header;
