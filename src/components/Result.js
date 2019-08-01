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
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer bedq5v6c2amz4krnzhsq79hq',
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
        let cName = 'show';
        if (error) {
            return <div>Fehler: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className={`preloader ${cName}`}><div className="lightbox"></div><div className="spinner"><i className="fas fa-4x fa-globe fa-pulse"></i></div></div>;
        } else {
            return (
                <ResultItem key={serverResponse.toString()} item={serverResponse}/>
            );
        }
    }
}
