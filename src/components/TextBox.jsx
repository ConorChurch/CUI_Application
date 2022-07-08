import '../style/TextBox.css';
import React from 'react';

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

    handleKeyDown = e => {
        if(e.key === 'Enter'){
            this.handleSubmit(e)
        }
    }

    handleChange ({target}) {
        target.style.height = "inherit";
        target.style.height = `${target.scrollHeight}px`;
        this.setState({
            userInput: target.value
        })
    }

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