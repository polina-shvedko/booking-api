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
        let data = new URLSearchParams();
        data.append('client_id', 'f89h9grfggwh4247f6baxkz2');
        data.append('client_secret', '6gFXhBHT5u');
        data.append('grant_type', 'client_credentials');

        let headersContent = new Headers();
        headersContent.append( "Content-Type", "application/x-www-form-urlencoded");
        headersContent.append("Accept", "*/*");
        headersContent.append("Cache-Control", "no-cache");
        headersContent.append("Accept-Encoding", "gzip, deflate");
        headersContent.append("Content-Length", "89");
        headersContent.append("Connection", "keep-alive");
        headersContent.append("cache-control", "no-cache");
        headersContent.append("Access-Control-Allow-Origin", "*");

        fetch('https://api.lufthansa.com/v1/oauth/token', {
            method: 'POST',
            mode : 'no-cors',
            headers: headersContent,
            body: data,
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        serverResponse: result
                    });

                    if(result.hasOwnProperty('access_token')){
                        localStorage.setItem('keyAPI', result.access_token);
                    }
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
                localStorage.setItem('keyAPI', serverResponse.access_token);
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
