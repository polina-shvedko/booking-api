import React from 'react';
import * as axios from "axios";

export default class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            serverResponse: []
        };
    }

    sendRequestAuth() {
        let data = new URLSearchParams();
        data.append('client_id', 'f89h9grfggwh4247f6baxkz2');
        data.append('client_secret', '6gFXhBHT5u');
        data.append('grant_type', 'client_credentials');

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

        axios.post('https://api.lufthansa.com/v1/oauth/token', data,{
            headers: headersContent
        }).then((result) => {
            if (result.data.hasOwnProperty('access_token')) {
                localStorage.setItem('keyAPI', result.data.access_token);
            }
            this.setState({
                isLoaded: true,
                serverResponse: result.data
            });


        })
        .catch((response) => {
            this.setState({
                isLoaded: false,
                serverResponse: response
            });
        });
    }

    render() {
        const {error, isLoaded, serverResponse} = this.state;

        if (error) {
            return (
                <div className={`row fehler`}>
                    <div className={`col-12`}>Fehler: {error.message}</div>
                </div>
            );
        } else if (!isLoaded) {
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
            if (serverResponse.hasOwnProperty('access_token')) {
                localStorage.setItem('keyAPI', serverResponse.access_token);
            }

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
