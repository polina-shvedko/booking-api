import React from 'react';
import ResultItem from "./ResultItem";

export default class Result extends React.Component {
    //TODO: get data from API
    serverResponse = [1, 2, 3, 4, 5, 6];

    render() {
        const items = this.serverResponse.map((item) =>
            <ResultItem key={item.toString()} item={item}/>
        );

        return (
            <div className="row result">
                {items}
            </div>
        );
    }
}
