import React from 'react';

export default class Form extends React.Component {
    state = {
        abfahrt: '',
        ankunft: '',
        tagAbfahrt: '',
        numReisenden: '',
        direct: ''
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
                <div className="row">
                    <div className="col-6">
                        <div className="form-group row">
                            <label htmlFor="abfahrt" className="col-3 col-form-label">Abfahrt von:</label>
                            <div className="col-9">
                                <input id="abfahrt" type="text" className="form-control" name="abfahrt" value={this.state.abfahrt} onChange={e => this.change(e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group row">
                            <label htmlFor="abfahrt" className="col-3 col-form-label">Ankunft zu:</label>
                            <div className="col-9">
                                <input id="ankunft" type="text" className="form-control" name="ankunft" value={this.state.ankunft} onChange={e => this.change(e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group row">
                            <label htmlFor="tagAbfahrt" className="col-3 col-form-label">Tag des Abfahrts</label>
                            <div className="col-9">
                                <input id="tagAbfahrt" type="text" className="form-control" name="tagAbfahrt" value={this.state.tagAbfahrt} onChange={e => this.change(e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group row">
                            <label htmlFor="numReisenden" className="col-3 col-form-label">Nummer der Reisenden</label>
                            <div className="col-9">
                                <input id="numReisenden" type="text" className="form-control" name="numReisenden" value={this.state.numReisenden} onChange={e => this.change(e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group row">
                            <div className="col-6">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="direct" name="direct" value={this.state.direct} onChange={e => this.change(e)}/>
                                    <label className="form-check-label" htmlFor="direct">Direct Flüg</label>
                                </div>
                            </div>
                            <div className="col-6 text-right">
                                <button onClick={e => this.onSubmit(e)} className="btn btn-success">Suchen</button>
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        );
    }
}
