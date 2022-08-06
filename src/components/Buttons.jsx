import React from 'react';
import '../style/Buttons.css';

  // This component is responsible for displaying button options to the User
  export class Buttons extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            userInput: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // When a button is clicked the string is sent back to the parent function
    handleSubmit (buttonValue){
        this.props.parentCallback(buttonValue)
        this.setState({userInput: buttonValue})
    }

    // Renders the list of buttons the input file has given
    render() {
        const buttons = [];
        for( var i =0; i< this.props.choices.length; i++){
            buttons.push(<button key={this.props.choices[i]} onClick={this.handleSubmit.bind(this.props.choices[i])}  className={this.props.choices[i]}>{this.props.choices[i]}</button>)
        }
        return (
            <>
            <div className='buttonBox'>
                {this.props.choices?.map((choice,i) => (
                        <button key={i} value={choice.Answer} className="buttons" onClick={() => this.handleSubmit(choice)}>
                            {choice.Answer}
                        </button>
                ))}
            </div>
            </>
        )
    }
  }

  export default Buttons;