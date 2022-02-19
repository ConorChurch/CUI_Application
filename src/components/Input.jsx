import React from 'react';
import ReactDOM, { render } from 'react-dom';
import data from '../input.json';
import App from '../App';
import Card from 'react-bootstrap/Card'
import reportWebVitals from '../reportWebVitals';
import { useNavigate } from "react-router-dom";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import { useState } from 'react';
import { Component } from 'react';






class Input extends Component{

  
   
      render(){
        return (
            
            <div>
                <form > 
                    <label>
                        Please input your config file and email:
                        <input type="file" name="config"/>
                    </label>
                    <input type="text" name="email"/>
                </form>    
                <button
                onClick={() => {
                    this.renderStep();
                }}
                >
                    Input File
                </button>
            </div>
        
        )
    }
    
}

export default Input;

