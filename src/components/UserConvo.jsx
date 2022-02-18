import '../App.css';
import React from 'react';
import TextBox from './TextBox';
import { useNavigate } from "react-router-dom";
import data from '../input.json';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './UserConvo.css';


class UserConvo extends React.Component { 

  constructor(){
    super()
    this.state = {
      greeting: data.Greeting,
      messages: data.Conversation,
      farewell: data.Farewell,
      counter: 1,
      questionsArray: [{type: "question", message: data.Conversation.at(0).Message, classname: "left"}],
    }
    this.handleCallback = this.handleCallback.bind(this);
  }



  handleCallback = (textInput) => {

    var newQuestions;
    if(this.state.counter >= data.Conversation.length){
      newQuestions = [...this.state.questionsArray, {type: "answer", message: textInput}];
    } else{

      newQuestions  = [...this.state.questionsArray, {type: "answer", message: textInput}, {type: "question", message: data.Conversation.at(this.state.counter).Message}];

    }
    this.setState(prevState => ({
      questionsArray: newQuestions,
      counter: prevState.counter+1
    }))

  }


  render(){

    const conversation = [];
    for( var i =0; i< this.state.questionsArray.length; i++){
      
      conversation.push(<div key={i} className={this.state.questionsArray[i].type}>{this.state.questionsArray[i].message}</div>)
      
    }

    return (
          <div>
              <div className='displayConversation'>
                {conversation} 
              </div>
                <TextBox parentCallback = {this.handleCallback}/>      
          </div>
    );
  }
}

export default UserConvo;
