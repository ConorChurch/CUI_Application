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
      questionsArray: [],
      answersDone: false,
      freeText: true,
      choices: [],
      timeTakenForCurrentQuestion: 0
    }
    this.handleCallback = this.handleCallback.bind(this);
    this.handleEndOfConversation = this.handleEndOfConversation.bind(this);
  }

  // First question/message will appear when the page is rendered
  // The timer is started for the first question
  componentDidMount = () => {

    this.setState({
      questionsArray: [{type: "question", message: data.Conversation.at(0).Message}]
    })
    this.timer()

  }


  // Records the time taken to answer each question
  // The timer increments in seconds
  timer = () => {
    this. f = setInterval( () => {
      this.setState({
        timeTakenForCurrentQuestion: this.state.timeTakenForCurrentQuestion +1
      })}, 1000)
  }

  // The timer is reset when this message is called
  // This will happen each time an answer is given
  // The timer is restarted also
  resetTimer = () => {
    clearInterval(this.f);
    this.setState({
      timeTakenForCurrentQuestion: 0
    })
    this.timer();
  }

  // This method handles the answer that is given to add to the conversation array
  handleCallback = (textInput) => {

    var answer;

    answer = [...this.state.questionsArray, {type: "answer", message: textInput, timeTakenForCurrentQuestion: this.state.timeTakenForCurrentQuestion}];
    if(this.state.counter >= data.Conversation.length){
      
      setTimeout(() => {
        this.handleEndOfConversation(answer)
        this.setState({answersDone: true})
      }, 2000)
      
    }
    else{

      this.setState(() => ({
        questionsArray:  answer
      }))
      this.resetTimer();
      this.appendQuestion(answer);

    }
  

    console.log(this.state.questionsArray.length)

  }


  // Once the answer is given, the next question is appended to the array
  // It will not appear for the alloted time set in the timeout
  appendQuestion = (answer) => {

    var newQuestions;
    newQuestions  = [...this.state.questionsArray, answer[answer.length-1], {type: "question", message: data.Conversation.at(this.state.counter).Message}];
    
    setTimeout(() => {
    
      if(data.Conversation.at(this.state.counter).Type === "choice"){
          
        this.setState(prevState => ({
          choices: data.Conversation.at(this.state.counter).Choices,
          freeText: false,
          questionsArray:  newQuestions,
          counter: prevState.counter+1
        }))
        console.log(this.state.choices)
      }
      else{
        this.setState(prevState => ({
          freeText: true,
          questionsArray:  newQuestions,
          counter: prevState.counter+1
        }))
      }
    }, 2000)

  }

  // Once the conversation has ended this method is called
  // It sends the completed conversation to the server
  handleEndOfConversation = (conversation) => {
    axios
      .post("http://127.0.0.1:28001/save", conversation)
      .then(res => {
        if(res.data["status code"] === "200"){
          console.log(conversation)
        }
      }).catch((error) => {
        console.log(conversation)
      });
  }


  // The render method will display each message of the conversation as it arrives
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
