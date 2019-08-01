import React from 'react';

export default class ResultItem extends React.Component {
    render() {
        return (
            <div className="col-3">
                {this.props.item}
            </div>
        );
    }
}
