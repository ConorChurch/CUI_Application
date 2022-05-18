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
            </form><button type="submit" onClick={this.handleSubmit}> Submit</button>
            </>
        )
    }

  }

  export default TextBox;