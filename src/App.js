import logo from './logo.svg';
import './App.css';
import React from 'react';
import CUI from './components/CUI'
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/


/*
import Home from "./components/Home";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/Home" element={<Home/>} />
            
          <Navigate to="/" />
        </Routes>
      </Router>
    </>
  );
}

*/

function App () { 

  let navigate = useNavigate();

  const onSubmit = (e) => {
    navigate('/CUI');
  }



  return (
      <div class="center">
          <h1>Please enter configuration file to begin</h1>
          <form >
              <label > Please enter Config File:
              <input onChange={onSubmit} type="file" />
              </label>
          </form>
      </div>
  );


}
export default App;
