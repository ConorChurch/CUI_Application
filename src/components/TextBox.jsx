import '../style/TextBox.css';
import React from 'react';


  // This component is responsible for handling the input text box and submit button
  export class TextBox extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            userInput: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }


    // When the form has been submitted, the parent function is called with the returned message to be printed
    handleSubmit = event =>{
        event.preventDefault();
        if(this.props.waitForQuestion !== true){
            this.props.parentCallback(this.state.userInput);
        }
        this.setState({userInput: ""})
        var textarea = document.getElementById('target');
        textarea.setAttribute('style','');
        textarea.value = "";
    }

    // This checks for if the key entered is "Enter" key
    handleKeyDown = e => {
        if(e.key === 'Enter'){
            this.handleSubmit(e)
        }
    }

    // When the text box changes the height changes relative to the number of the scroll height
    handleChange ({target}) {
        target.style.height = "inherit";
        target.style.height = `${target.scrollHeight}px`;
        this.setState({
            userInput: target.value
        })
    }

    // Renders form in a span so it can expand to size needed
    render() {
        return (
            <span>
                <form onSubmit={this.handleSubmit}>
                    <textarea
                        id='target'
                        className='textInput'
                        placeholder='Type your response here...'
                        type="text" 
                        name="userInput"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                    />
                    <input 
                        className="submitButton"
                        type="submit"
                    />
                </form>
            </span>
        )
    }
  }

  export default TextBox;