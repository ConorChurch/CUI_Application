import '../App.css';
import React from 'react';
import TextBox from './TextBox';
import Buttons from './Buttons';
import data from '../input.json';
import '../style/UserConvo.css';
import EndPage from './EndPage';
import axios from 'axios';


class UserConvo extends React.Component { 

  constructor(){
    super()
    this.state = {
      greeting: data.Conversation.Greeting,
      messages: data.Conversation,
      farewell: data.Farewell,
      counter: 1,
      questionsArray: [{type: "question", message: data.Conversation.at(0).Message, classname: "left"}],
      answersDone: false,
      freeText: true,
      choices: []
    }
    this.handleCallback = this.handleCallback.bind(this);
    this.handleEndOfConversation = this.handleEndOfConversation.bind(this);
  }


  handleCallback = (textInput) => {
    var newQuestions;

    if(this.state.counter >= data.Conversation.length){

      newQuestions = [...this.state.questionsArray, {type: "answer", message: textInput}];
      this.handleEndOfConversation(newQuestions)
      this.setState({answersDone: true})

    } 
    else{

      newQuestions  = [...this.state.questionsArray, {type: "answer", message: textInput}, {type: "question", message: data.Conversation.at(this.state.counter).Message}];
      if(data.Conversation.at(this.state.counter).Type === "choice"){
        this.setState({
          choices: data.Conversation.at(this.state.counter).Choices,
          freeText: false
        })
        console.log(this.state.choices)
      }
      else{
        this.setState({freeText: true})
      }
    }
    this.setState(prevState => ({
      questionsArray: newQuestions,
      counter: prevState.counter+1
    }))

  }

  handleEndOfConversation = (conversation) => {
    axios
      .post("http://127.0.0.1:5000/save", conversation)
      .then(res => {
        if(res.data["status code"] === "200"){
          console.log(conversation)
        }
      }).catch((error) => {
        console.log(conversation)
      });
  }


  render(){

    const conversation = [];
    for( var i =0; i< this.state.questionsArray.length; i++){
      
      conversation.push(<div key={i} className={this.state.questionsArray[i].type}>{this.state.questionsArray[i].message}</div>)
      
    }

    return (
          <div>
              <div className='displayConversation'>
                {(this.state.answersDone === false) && conversation}
                {(this.state.answersDone === true) && <EndPage endMessage = {this.state.farewell}/>}
              </div>
                
                {(this.state.answersDone === false) && (this.state.freeText === true) && <TextBox parentCallback = {this.handleCallback} />  }   
                {(this.state.answersDone === false) && (this.state.freeText === false) && <Buttons parentCallback = {this.handleCallback} choices={this.state.choices} /> }
          </div>
    );
  }
}

export default UserConvo;
