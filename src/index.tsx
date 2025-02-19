import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./components/app/App";
import {BrowserRouter} from "react-router-dom";

// var granimInstance = new Granim({
//   element: '#canvas-basic',
//   direction: 'left-right',
//   isPausedWhenNotInView: true,
//   states : {
//     "default-state": {
//       gradients: [
//         ['#ff9966', '#ff5e62'],
//         ['#00F260', '#0575E6'],
//         ['#e1eec3', '#f05053']
//       ]
//     }
//   }
// });

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
