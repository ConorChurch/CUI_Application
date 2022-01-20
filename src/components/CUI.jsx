import React from 'react';
import ReactDOM, { render } from 'react-dom';
import '../index.css';
import App from '../App';
import reportWebVitals from '../reportWebVitals';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
  




const CUI = () => {
  return (
    <div class="outermost">
       
       
        <h1>Success!!</h1>
        <div class="scroll">


        </div>
        <form>
            <label> Response: 
                <input type="text" />
            </label>
        </form>




    </div>

  );
};

ReactDOM.render(<CUI/>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


export default CUI;