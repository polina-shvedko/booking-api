import React from 'react';
import ResultItem from "./ResultItem";

export default class Result extends React.Component {
   render() {
       let serverResponse = this.props.item;
        return (
            <div className={`row`}>
                <div className={`col-12`}>
                    <ResultItem key={serverResponse.toString()} item={serverResponse}/>
                </div>
            </div>
        );
    }
}
