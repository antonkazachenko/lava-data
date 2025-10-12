import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { FC } from 'react';
import styles from './App.module.css';
import HomePage from '../../pages';
import { AboutComponent, Background, Header } from '../index';
import Modal from '../modal/modal';

const App: FC<object> = () => {
  const navigate = useNavigate();

  const handleModalClose = () => navigate('/');

  return (
    <>
      <Background />
      <Header />
      <HomePage />
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
