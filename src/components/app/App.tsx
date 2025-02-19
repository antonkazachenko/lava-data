import { Routes, Route } from 'react-router-dom';
import './App.css';
import {FC} from "react";
import {HomePage} from "../../pages";
import {Background} from "../index";

const App: FC<object> = () => {
  return (
    <>
      <Background />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        {/*<Route path="/about" element={<About />} />*/}
      </Routes>
    </>
  );
}

export default App;
