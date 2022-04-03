import '../App.css';
import React from 'react';
import TextBox from './TextBox';
import data from '../input.json';
import './UserConvo.css';
import EndPage from './EndPage';
import axios from 'axios';


class UserConvo extends React.Component { 

  constructor(){
    super()
    this.state = {
      greeting: data.Conversation.Greeting,
      messages: data.Conversation,
      farewell: data.Conversation.Farewell,
      counter: 1,
      questionsArray: [{type: "question", message: data.Conversation.at(0).Message, classname: "left"}],
      answersDone: false
    }
    this.handleCallback = this.handleCallback.bind(this);
    this.handleEndOfConversation = this.handleEndOfConversation.bind(this);
  }


  handleCallback = (textInput) => {
    var newQuestions;
    if(this.state.counter >= data.Conversation.length){
      newQuestions = [...this.state.questionsArray, {type: "answer", message: textInput}];
      this.handleEndOfConversation(this.state.questionsArray)
      this.setState({answersDone: true})
    } else{

      newQuestions  = [...this.state.questionsArray, {type: "answer", message: textInput}, {type: "question", message: data.Conversation.at(this.state.counter).Message}];

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
                {(this.state.answersDone === true) && <EndPage />}
              </div>
                
                {(this.state.answersDone === false) && <TextBox parentCallback = {this.handleCallback}/>  }   
          </div>
    );
  }
}

export default UserConvo;
