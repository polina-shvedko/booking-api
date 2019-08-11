import React from 'react';
import ResultItem from "./ResultItem";

/**
 *
 */
export default class Result extends React.Component {

    /**
     *
     * @returns {*}
     */
   render() {
       //* bekommen die Information von FormComponent
       let serverResponse = this.props.item;
        return (
            <div className={`row`}>
                <div className={`col-12`}>
                    {/* Anzeige des ResultItem Companent */}
                    <ResultItem key={serverResponse.toString()} item={serverResponse}/>
                </div>
            </div>
        );
    }
}
