import React, {
  FC, useState, useCallback, useEffect, useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';
import * as Slider from '@radix-ui/react-slider';
import { Bubbles } from '../../components';
import Modal from '../../components/modal/modal';
import styles from './home-page.module.css';
import { ReactComponent as PlayButton } from '../../assets/images/play.svg';
import { ReactComponent as PauseButton } from '../../assets/images/stop.svg';
import { Item } from '../../api/items';

interface IHomePageProps {
  items: Item[];
  displayMode: 'title' | 'raw' | 'source';
}

const HomePage: FC<IHomePageProps> = ({ items, displayMode }) => {
  const [speed, setSpeed] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const location = useLocation();
  const isModalOpen = location.pathname === '/about';

  const togglePause = useCallback(() => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  }, []);

  const handleSpeedChange = useCallback((value: number[]) => {
    setSpeed(value[0] / 10);
  }, []);

  const sliderValue = useMemo(() => [Math.round(speed * 10)], [speed]);

  const handleBubbleClick = useCallback((item: Item) => {
    setSelectedItem(item);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  useEffect(() => {
    const clampSpeed = (value: number) => Math.min(10, Math.max(1, value));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        setIsPaused((prevIsPaused) => !prevIsPaused);
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        event.stopPropagation();
        setSpeed((prevSpeed) => clampSpeed(prevSpeed + 1));
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        event.stopPropagation();
        setSpeed((prevSpeed) => clampSpeed(prevSpeed - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  return (
    <>
      <Bubbles
        items={items}
        speed={isPaused ? 0 : speed}
        displayMode={displayMode}
        onBubbleClick={handleBubbleClick}
      />

      {!isModalOpen && !selectedItem && (
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
              value={sliderValue}
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

      {selectedItem && (
        <Modal
          onClose={handleModalClose}
          title={selectedItem.Predicted_Label}
          className={styles.modalWidth}
          headerClass={`${styles.modalHeader} mt-10 ml-10 mr-10`}
        >
          <div className={styles.modalBody}>
            <div className={styles.metaRow}>
              <span className={styles.label}>Category</span>
              <span className={styles.value}>{selectedItem.Predicted_Label}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.label}>Source</span>
              {selectedItem.website_url ? (
                <a
                  className={styles.value}
                  href={selectedItem.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedItem.website_url}
                </a>
              ) : (
                <span className={styles.value}>N/A</span>
              )}
            </div>
            <div className={styles.metaRow}>
              <span className={styles.label}>ID</span>
              <span className={styles.value}>{selectedItem.id}</span>
            </div>
            <div className={styles.rawContainer}>
              <span className={styles.label}>Raw Data</span>
              <p className={styles.rawText}>{selectedItem.cleaned_website_text}</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default HomePage;
