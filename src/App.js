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
        <div className="App container">
          <header className="header">
            <div className="row align-items-center">
              <div className="col-7 text-right">
                <h1>Flieg einfach mit Lufthansa</h1>
              </div>
              <div className="col text-left">
                <img src={logo} className="img-fluid logo" alt="logo" />
              </div>
            </div>

          </header>
          <Form onSubmit={fields => this.onSubmit(fields)}/>

        </div>
    );
  }

}

export default App;
