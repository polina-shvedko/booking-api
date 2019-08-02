import React from 'react';

export default class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            serverResponse: []
        };
    }

    sendRequestAuth(){
        fetch('https://api.lufthansa.com/v1/oauth/token', {
            method: 'POST',
            mode : 'no-cors',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "PostmanRuntime/7.15.2",
                "Accept": "*/*",
                "Cache-Control": "no-cache",
                "Postman-Token": "21f826f7-43f9-40aa-92a3-e1d7de1d555d,6f6d5c2f-facd-45fa-9251-bc24694b79b6",
                "Host": "api.lufthansa.com",
                "Accept-Encoding": "gzip, deflate",
                "Content-Length": "89",
                "Connection": "keep-alive",
                "cache-control": "no-cache"
            },
            body: {
                "client_id": "f89h9grfggwh4247f6baxkz2",
                "client_secret": "6gFXhBHT5u",
                "grant_type": "client_credentials"
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        serverResponse: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, serverResponse } = this.state;

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
            if(serverResponse.hasOwnProperty('access_token')){
                localStorage.setItem('key', serverResponse.access_token);
            }

            if(serverResponse.hasOwnProperty('error')){
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
