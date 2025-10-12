import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { FC, useEffect, useState } from 'react';
import styles from './App.module.css';
import HomePage from '../../pages';
import { AboutComponent, Background, Header } from '../index';
import Modal from '../modal/modal';
import LoadingScreen from '../loading-screen/loading-screen';
import { fetchRandomItems, Item } from '../../api/items';

const App: FC<object> = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);

  const handleModalClose = () => navigate('/');

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      const fetchedItems = await fetchRandomItems();
      setItems(fetchedItems);
      setLoading(false);
    };

    loadItems();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Background />
      <Header />
      <HomePage items={items} />
      <Routes>
        <Route
          path="/about"
          element={(
            <Modal
              onClose={handleModalClose}
              title="About The Project"
              className={styles.modalWidth}
              headerClass={`${styles.modalHeader} mt-10 ml-10 mr-10`}
            >
              <AboutComponent />
            </Modal>
          )}
        />
      </Routes>
    </>
  );
};

export default App;
