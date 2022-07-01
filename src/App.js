import './App.css';
import React from 'react';
import UserConvo from './components/UserConvo';


class App extends React.Component { 

  render(){
    return (  
      <div className='dialogueBox'>
        {<UserConvo/>}
      </div>
    );
  }
}

export default App;
