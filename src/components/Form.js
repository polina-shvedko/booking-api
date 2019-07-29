import React from 'react';

export default class Form extends React.Component{
    state = {
        name: ''
    };

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
    };

    render() {
        return (
            <form method="GET">
                <input
                    className="form-control"
                    name={this.state.name}
                    value={this.state.name}
                    onChange={e => this.change(e)}
                />
                <button onClick={e => this.onSubmit(e)} className="btn btn-success">Submit</button>
            </form>
        );
    }
}
