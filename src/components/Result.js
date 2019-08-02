import React from 'react';
import ResultItem from "./ResultItem";

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            serverResponse: []
        };
    }

    sendRequestFlies(url){
        let apiKey = localStorage.getItem('keyAPI') || null;
        // let apiKey = 'bhdtndbgu4pckb9umb6p9fcp';
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey,
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
                <div className={`row`}>
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
            return (
                <div className={`row`}>
                    <div className={`col-12`}>
                        <ResultItem key={serverResponse.toString()} item={serverResponse}/>
                    </div>
                </div>
            );
        }
    }
}