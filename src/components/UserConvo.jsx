import '../App.css';
import React from 'react';
import TextBox from './TextBox';
import Buttons from './Buttons';
import data from '../input.json';
import '../style/UserConvo.css';
import EndPage from './EndPage';
import axios from 'axios';


// Component for handling the conversation rendering and posting to the /save endpoint

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
      timeTakenForCurrentQuestion: 0,
      waitForQuestion: false,
      avatar: data.Parameters[0]['Avatar'],
      serverAddress: data.Parameters[1]['Server Address']
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
    this.f = setInterval( () => {
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
  handleCallback = (response) => {
      var textInput = response;
      if(response.Answer !== undefined && response.Answer !== null){
        textInput = response.Answer;
      }
      
      var answer;
      
      if(this.state.questionsArray[this.state.questionsArray.length-1].type !== "question"){
        this.setState ({
          waitForQuestion: true
        })
      }
      else{
        answer = [...this.state.questionsArray, {type: "answer", message: textInput, timeTakenForCurrentQuestion: this.state.timeTakenForCurrentQuestion}];
      
        this.setState(() => ({
          questionsArray:  answer
        }))
        if(this.state.counter >= data.Conversation.length){
          
          setTimeout(() => {
            this.handleEndOfConversation(answer)
            this.setState({
              answersDone: true
            })
          }, 2000)
          
        }
        else{
          this.resetTimer();
          
          if(response.Type !== undefined){
            this.nestedQuestions(answer, response);
          }
          else{
            this.appendQuestion(answer);
          }

        }
      }
  }


  // Once the answer is given, the next question is appended to the array
  // It will not appear for the alloted time set in the timeout
  appendQuestion = (answer) => {

    var newQuestions;
    newQuestions  = [...this.state.questionsArray, answer[answer.length-1], {type: "question", message: data.Conversation.at(this.state.counter).Message}];
    
    setTimeout(() => {
    
      if(data.Conversation.at(this.state.counter).Type === "choice"){
        if(data.Conversation.at(this.state.counter).Choices.length <= 4){
          this.setState(prevState => ({
            choices: data.Conversation.at(this.state.counter).Choices,
            freeText: false,
            questionsArray:  newQuestions,
            counter: prevState.counter+1,
            waitForQuestion: false
          }))
        }
        else{
          this.setState(prevState => ({
            choices: data.Conversation.at(this.state.counter).Choices.slice(0,4),
            freeText: false,
            questionsArray:  newQuestions,
            counter: prevState.counter+1,
            waitForQuestion: false
          }))
        }
      }
      else{
        this.setState(prevState => ({
          freeText: true,
          questionsArray:  newQuestions,
          counter: prevState.counter+1,
          waitForQuestion: false
        }))
      }
    }, 2000)
  }


  // If the answer object returned from the multiple choice question has a "Type" it is another nested 
  // question and this function is callled instead of the normal appendQuestion
  // Very similar to the function above except it doesn't add to the counter
  nestedQuestions = (answer, response) => {

    var newQuestions;
    newQuestions  = [...this.state.questionsArray, answer[answer.length-1], {type: "question", message: response.Message}];
    
    setTimeout(() => {
    
      if(response.Type === "choice"){
        if(response.Choices.length <= 4){
          this.setState(prevState => ({
            choices: response.Choices,
            freeText: false,
            questionsArray:  newQuestions,
            waitForQuestion: false
          }))
        }
        else{
          this.setState(prevState => ({
            choices: response.Choices.slice(0,4),
            freeText: false,
            questionsArray:  newQuestions,
            waitForQuestion: false
          }))
        }
      }
      else{
        this.setState(prevState => ({
          freeText: true,
          questionsArray:  newQuestions,
          waitForQuestion: false
        }))
      }
    }, 2000)
  }


  // Once the conversation has ended this method is called
  // It sends the completed conversation to the server
  handleEndOfConversation = (conversation) => {
    axios
      .post(this.state.serverAddress+"/save", conversation)
      .then(res => {
        if(res.data["status code"] === "200"){
          console.log(conversation)
        }
      }).catch((error) => {
        console.log(conversation)
        console.log("THE ERROR IS "+error)
        console.log(error.response.data)
      });
  }


  // The render method will display each message of the conversation as it arrives
  // It will only render an answer if the string is not answer, but an empty string is still accepted as an answer
  render(){

    const conversation = [];
    for( var i =0; i< this.state.questionsArray.length; i++){
      if(this.state.questionsArray[i].message !== ""){
        conversation.push(<div key={i} className={this.state.questionsArray[i].type}><span className={this.state.questionsArray[i].type}>{this.state.questionsArray[i].message}</span></div>)
      }
      else{
        conversation.push(<div key={i} className={this.state.questionsArray[i].type}>{this.state.questionsArray[i].message}</div>)
      }
    }

    return (
          <>
              {(this.state.answersDone === true) && <EndPage endMessage = {this.state.farewell}/>}
              {(this.state.answersDone === false) &&
                <div className='dialogueBox'>
                <header className='Header'> 
                  <img src={data.Parameters[0]['Avatar Image']} alt='Avatar' />
                  <div className='name'>
                    {data.Parameters[0]['Avatar Name']}
                  </div> 
                </header> 
                <div className='Conversation'>
                  {conversation}
                </div> 
                <footer className='Input'>
                  {(this.state.answersDone === false) && (this.state.freeText === true) && <TextBox parentCallback = {this.handleCallback} waitForQuestion = {this.waitForQuestion} />  }   
                  {(this.state.answersDone === false) && (this.state.freeText === false) && <Buttons parentCallback = {this.handleCallback} choices={this.state.choices} waitForQuestion = {this.waitForQuestion} /> }
                </footer> 
              </div>
              }
          </>
    );
  }
}

export default UserConvo;
