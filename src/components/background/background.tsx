import styles from './background.module.css';
import {FC} from "react";

const Background: FC<object> = () => {
  return (
    <div className={styles.gradientBackground}>
    </div>
  );
};

export default Background;
