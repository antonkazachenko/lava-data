import { Routes, Route } from 'react-router-dom';
import './App.css';
import React, { FC } from 'react';
import HomePage from '../../pages';
import { Background, Header } from '../index';

const App: FC<object> = () => (
  <>
    <Background />
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  </>
);

export default App;
