import React, {Component} from 'react';
import logo from './img/logo.png';
import Form from './components/Form';
import './App.css';

class App extends Component{

  state = {
    fields: {}
  };

  onSubmit = fields => {
    console.log("App comp got: ", fields);
  };

  render(){
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Form onSubmit={fields => this.onSubmit(fields)}/>
          </header>
        </div>
    );
  }

}

export default App;
