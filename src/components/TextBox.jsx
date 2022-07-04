import React from 'react';

  export class TextBox extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            userInput: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit = event =>{
        event.preventDefault();
        if(this.props.waitForQuestion !== true){
            this.props.parentCallback(this.state.userInput)
        }
        this.setState({userInput: ""})
    }

    handleChange({target}){
        this.setState({
            userInput: target.value
        })
    }

    render() {
        return (
            <form>
                    <input
                        className="textInput"
                        placeholder='Type your response here...'
                        type="text" 
                        name="userInput"
                        value={this.state.userInput}
                        onChange={this.handleChange}
                    />
                    <input className="submitButton"
                        type="submit" onClick={this.handleSubmit}/>
            </form>
        )
    }

  }

  export default TextBox;