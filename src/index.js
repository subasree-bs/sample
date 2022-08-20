import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes,Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Productadd from "./Create";
import Productedit from "./Edit";
import Productview from "./View";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="addproduct" element={<Productadd />} />
      <Route path="editproduct" element={<Productedit />} />
      <Route path="viewproduct" element={<Productview />} />
    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
