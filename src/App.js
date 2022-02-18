import logo from './logo.svg';
import './App.css';
import React from 'react';
import CUI from './components/CUI'
import TextBox from './components/TextBox';
import { useNavigate } from "react-router-dom";
import data from './input.json';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Input from './components/Input';
import Output from './components/Output';



class App extends React.Component { 

  constructor(){
    super()
    this.state = {
      greeting: data.Greeting,
      messages: data.Conversation,
      farewell: data.Farewell,
      counter: 7,
      msg: "",
      userConvo: []
    }
  }


  render(){

    return (
           
      <div>
        <h1> App</h1>
      </div>
    
    );
  }


}

export default App;
