import './App.css';
import React from 'react';
import UserConvo from './components/UserConvo';


class App extends React.Component { 

  render(){
    return (  
      <>
        {<UserConvo/>}
      </>
    );
  }
}

export default App;
