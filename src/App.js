import React, {Component} from 'react';
import logo from './img/logo.png';
import Form from './components/Form';
import './App.css';
import Result from "./components/Result";
import LoadAirports from "./components/LoadAirports";

class App extends Component{

  constructor(props){
    super(props);
    new LoadAirports();
  }

  state = {
    fields: {}
  };

  onSubmit = fields => {
    console.log("App comp got: ", fields);
  };

  render(){
    return (
        <div className="App container">
          <LoadAirports/>
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
          <Result />
        </div>
    );
  }

}

export default App;
