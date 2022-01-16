import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
  apiKey: "AIzaSyDdglAphX7ZR-EpbatYkCZlozY7SmZwAq0",
  authDomain: "f1-stats-c5aa2.firebaseapp.com",
  projectId: "f1-stats-c5aa2",
  storageBucket: "f1-stats-c5aa2.appspot.com",
  messagingSenderId: "420346117879",
  appId: "1:420346117879:web:63ebc1f839ae66c42a9df2",
  measurementId: "G-BFZT59TREY"
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
