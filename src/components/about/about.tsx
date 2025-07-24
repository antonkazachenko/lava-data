import React, { FC } from 'react';
import styles from './about.module.css';

const AboutComponent: FC = () => (
  <div>
    <div className={styles.mainText}>
      <h3>Overview</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium aliquid animi,
        assumenda commodi consectetur delectus deserunt dicta doloremque ea eos ex excepturi,
        facilis inventore iure labore laboriosam laborum laudantium modi molestias neque odit
        officia officiis omnis quo quos similique soluta sunt, unde veniam voluptas voluptate
        voluptatem voluptates? Accusantium asperiores deleniti esse incidunt necessitatibus,
        omnis? A accusantium, beatae consequuntur delectus dolorem eligendi esse est et ex
        expedita libero molestiae natus necessitatibus perferendis quae quas quod rem suscipit
        tempora totam ullam velit voluptatum. Alias animi blanditiis commodi deserunt dolor
        dolorem fugit, illum in, maxime, necessitatibus neque officia placeat quis ratione soluta.
      </p>
    </div>
    <div className={styles.link}>
      <a
        href="https://www.nickmvincent.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Link
      </a>
    </div>
  </div>
);

export default AboutComponent;
