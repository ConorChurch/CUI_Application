import React from 'react';
import { Component } from 'react';

class EndPage extends Component{


      render(){
        return (
            
            <div>
                <h1> {this.props.endMessage} </h1>
            </div>
        
        )
    }
    
}

export default EndPage;