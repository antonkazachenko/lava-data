import React, { FC, useEffect, useState } from 'react';
import { Bubbles } from '../../components';
import { fetchRandomItems, Item } from '../../api/items';

const HomePage: FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return <Bubbles items={items} />;
};

export default HomePage;
