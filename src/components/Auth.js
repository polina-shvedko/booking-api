//* Import React
import React from 'react';
//* Import axios - библиотека для отправки запросов на сервер и получения ответов  аякс
import * as axios from "axios";

//* Component Auth - расширяет функциональность класса Component из реакта, исп для получения токена от люфтганзы
export default class Auth extends React.Component {
    //* конструктор класса Auth в котором мы объевляем значения по умолчанию для состояния (this.state) класса
    constructor(props) {
        //* вызов конструктора родительского класса
        super(props);
        //* состояния класса Auth 
        this.state = {
            error: null, //* состояние ошибка 
            isLoaded: false, //* состояние процесса загрузки
            serverResponse: [] //* состояние ответа сервера
        };
    }

    //* die Methode, die einen Aufruf zum LG Server macht und eine Antwort im LocalStorage des WebBrowsers speichert
    sendRequestAuth() {
        //* Erzeugen das Körper des Aufrufs
        let data = new URLSearchParams();
        //* Nach Dokumentation von LH
        data.append('client_id', 'f89h9grfggwh4247f6baxkz2');
        data.append('client_secret', '6gFXhBHT5u');
        data.append('grant_type', 'client_credentials');

        //* Nach Dokumentation von LH
        //* Erzeugen Header des Aufrufs 
        let headersContent = new Headers();
        headersContent.append("Content-Type", "application/x-www-form-urlencoded");
        headersContent.append("User-Agent", "PostmanRuntime/7.15.2");
        headersContent.append("Accept", "*/*");
        headersContent.append("Cache-Control", "no-cache");
        headersContent.append("Postman-Token", "858aa52e-57a6-4fe1-994d-6b96f258f9b3,5087d28e-946a-4d67-b408-108e53a31615");
        headersContent.append("Host", "api.lufthansa.com");
        headersContent.append("Accept-Encoding", "gzip, deflate");
        headersContent.append("Content-Length", "89");
        headersContent.append("Connection", "keep-alive");
        headersContent.append("cache-control", "no-cache");

        //* Machen einen POST Aufruf
        axios.post('https://api.lufthansa.com/v1/oauth/token', data,{
            headers: headersContent
        }).then((result) => {
            //* Erhalten eine Antwort von LH Server und speihern sie im localStorage
            if (result.data.hasOwnProperty('access_token')) {
                localStorage.setItem('keyAPI', result.data.access_token);
            }

            //* Erneunen der Statuses
            this.setState({
                isLoaded: true,
                serverResponse: result.data
            });
        })
        .catch((response) => {
            //* Erneunen der Statuses bei Erhaltung Err
            this.setState({
                isLoaded: false,
                serverResponse: response
            });
        });
    }

    //* Render Methode - функция рендеринга контента компонента выводит на экран
    render() {

        //* Speichern die Statuses in die Variable
        const {error, isLoaded, serverResponse} = this.state;

        //* Wenn eine Fehler haben, zeigen wir eine Anzeige  über Err
        if (error) {
            return (
                <div className={`row fehler`}>
                    <div className={`col-12`}>Fehler: {error.message}</div>
                </div>
            );
        } else if (!isLoaded) {
            //* Zeigen Preloader wärend des Aufrufs zum LH Server
            return (
                <div className={`row`}>
                    <div className={`col-12`}>
                        <div className={`preloader`}>
                            <div className="lightbox">&nbsp;</div>
                            <div className="spinner"><i className="fas fa-4x fa-globe fa-pulse"></i></div>
                        </div>
                    </div>
                </div>
            );
        } else {
            //* Nach der ServerAntwort 
            //* entwieder speichern wir die Antworte im localStorage
            if (serverResponse.hasOwnProperty('access_token')) {
                localStorage.setItem('keyAPI', serverResponse.access_token);
            }

            //* oder  wir zeigen eine Anzeige  über Err 
            if (serverResponse.hasOwnProperty('error')) {
                return (
                    <div className={`row fehler`}>
                        <div className={`col-12`}>Fehler: {serverResponse.error}</div>
                    </div>
                );
            }
            return ('');
        }
    }
}
