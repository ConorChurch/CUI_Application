import React from 'react';
import '../style/EndPage.css'
import { Component } from 'react';

class EndPage extends Component{


      render(){
        return (
            
            <div className='center'>
                <h1> {this.props.endMessage} </h1>
            </div>
        
        )
    }
    
}

export default EndPage;