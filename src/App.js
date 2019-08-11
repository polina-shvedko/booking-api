//* Import React
import React, {Component} from 'react';
//* Import Logo
import logo from './img/logo.png';
//* Import component Form
import Form from './components/Form';
//* Import fonawesome icons
import '@fortawesome/fontawesome-free/css/all.css';
//* Import css styles für App component
import './App.css';
//* Import component Auth (Authentification)
import Auth from "./components/Auth";

//* Component App - расширяет функциональность класса Component из реакта
class App extends Component {
    
    //* Render Methode - функция рендеринга контента компонента выводит на экран
    render() {
        //* Creation von Auth class und Ausrufen der Methode sendRequestAuth, 
        //* die einen Tocken von Lüftganse erhalt.
        let auth = new Auth();
        auth.sendRequestAuth();
        
        //* gibt einen react specifisch html zurück.
        return (
            <div className="App container">
                <header className="header">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg text-center text-lg-right">
                            {/* logo - ist eine Variable */}
                            <img src={logo} className="img-fluid logo" alt="logo"/>
                        </div>
                        <div className="col-12 col-lg-7 text-center text-lg-left">
                            <h1>Flieg einfach mit Lufthansa</h1>
                        </div>

                    </div>
                </header>
                {/* rufen einen Component FORM */}
                <Form/>
            </div>
        );
    }

}

//* machen export App component - так требует реакт
export default App;
