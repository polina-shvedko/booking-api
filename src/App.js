import React, {Component} from 'react';
import logo from './img/logo.png';
import Form from './components/Form';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import Result from "./components/Result";

class App extends Component{
  state = {
    fields: {}
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
          <Form />
          <Result />
        </div>
    );
  }

}

export default App;
