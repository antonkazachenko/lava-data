import React, { FC, useEffect, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Bubbles } from '../../components';
import { fetchRandomItems, Item } from '../../api/items';
import styles from './home-page.module.css';

const HomePage: FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [speed, setSpeed] = useState(5);

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);
      const fetchedItems = await fetchRandomItems();
      setItems(fetchedItems);
      setIsLoading(false);
    };

    loadItems();
  }, []);

  if (isLoading) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '40vh' }}>Loading Data...</div>;
  }

  return (
    <>
      <Bubbles items={items} speed={speed} />
      <div className={styles.sliderContainer}>
        <span>Speed</span>
        <Slider.Root
          className={styles.SliderRoot}
          orientation="vertical"
          defaultValue={[50]}
          max={100}
          step={1}
          min={10}
          onValueChange={(value) => setSpeed(value[0] / 10)}
        >
          <Slider.Track className={styles.SliderTrack}>
            <Slider.Range className={styles.SliderRange} />
          </Slider.Track>
          <Slider.Thumb className={styles.SliderThumb} />
        </Slider.Root>
      </div>
    </>
  );
};

export default HomePage;
