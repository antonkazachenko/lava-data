import React, {
  FC, useState, useCallback,
} from 'react';
import { useLocation } from 'react-router-dom';
import * as Slider from '@radix-ui/react-slider';
import { Bubbles } from '../../components';
import styles from './home-page.module.css';
import { ReactComponent as PlayButton } from '../../assets/images/play.svg';
import { ReactComponent as PauseButton } from '../../assets/images/stop.svg';
import { Item } from '../../api/items';

interface IHomePageProps {
  items: Item[];
}

const HomePage: FC<IHomePageProps> = ({ items }) => {
  const [speed, setSpeed] = useState(5);
  const [isPaused, setIsPaused] = useState(false);

  const location = useLocation();
  const isModalOpen = location.pathname === '/about';

  const togglePause = useCallback(() => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  }, []);

  const handleSpeedChange = useCallback((value: number[]) => {
    setSpeed(value[0] / 10);
  }, []);

  return (
    <>
      <Bubbles items={items} speed={isPaused ? 0 : speed} />

      {!isModalOpen && (
        <>
          {/* Pause/Play Button */}
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className={styles.pauseContainer} onClick={togglePause}>
            <span>{isPaused ? 'Play' : 'Pause'}</span>
            {/* eslint-disable-next-line react/button-has-type */}
            <button className={styles.iconButton}>
              {isPaused ? <PlayButton /> : <PauseButton />}
            </button>
          </div>

          {/* Speed Slider */}
          <div className={styles.sliderContainer}>
            <span>Speed</span>
            <Slider.Root
              className={styles.SliderRoot}
              orientation="vertical"
              defaultValue={[50]}
              max={100}
              step={1}
              min={10}
              onValueChange={handleSpeedChange}
            >
              <Slider.Track className={styles.SliderTrack}>
                <Slider.Range className={styles.SliderRange} />
              </Slider.Track>
              <Slider.Thumb className={styles.SliderThumb} />
            </Slider.Root>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
