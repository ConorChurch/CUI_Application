import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './CUI.css';
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
  

  export class TextBox extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            userInput: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit (){
        this.props.parentCallback(this.state.userInput)
        this.setState({userInput: ""})
    }

    handleChange({target}){
        this.setState({
            userInput: target.value
        })
    }

    render() {
        return (
            <>
            <form>

                <input
                    placeholder='Type Response here'
                    type="text" 
                    name="userInput"
                    value={this.state.userInput}
                    onChange={this.handleChange}
                />
            </form><button onClick={this.handleSubmit}> Submit</button>
            </>
        )
    }

  }

  export default TextBox;