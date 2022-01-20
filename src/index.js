import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CUI from './components/CUI';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";

/*
const rootElement = document.getElementById("root");
render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}/>
    </Routes>
  </Router>
)
*/


render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />}/>
      <Route path="/CUI" element={<CUI />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);



/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
ReactDOM.render(document.getElementById('root'));
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
