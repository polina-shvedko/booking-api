import React from 'react';
import CitiesList from "./CitiesList";

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

    result: string;
    renderList = e => {
        let cities;
        cities = CitiesList.list;

        let result = [];
        for (let shotCut in cities) {
            let cityName = cities[shotCut];
            result.push(<option value={cityName}>{shotCut}</option>);
        }

        return result;
    };

    render() {
        return (
            <form method="GET">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group row">
                            <label htmlFor="abfahrt" className="col-2 col-form-label">Ankunft zu:</label>
                            <div className="col-10">
                                <input id="ankunft" list="search" type="text" className="form-control" name="ankunft"
                                       value={this.state.ankunft} onChange={e => this.change(e)}/>
                                <datalist id="search">
                                    {this.renderList()}
                                </datalist>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group row">
                            <label htmlFor="tagAbfahrt" className="col-4 col-form-label">Tag des Abfahrts</label>
                            <div className="col-8">
                                <input id="tagAbfahrt" type="text" className="form-control" name="tagAbfahrt"
                                       value={this.state.tagAbfahrt} onChange={e => this.change(e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group row">
                            <label htmlFor="numReisenden" className="col-4 col-form-label">Nummer der Reisenden</label>
                            <div className="col-8">
                                <input id="numReisenden" type="text" className="form-control" name="numReisenden"
                                       value={this.state.numReisenden} onChange={e => this.change(e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group row">
                            <div className="col-6">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="isDirect" name="direct"
                                           value={this.state.isDirect} onChange={e => this.change(e)}/>
                                    <label className="form-check-label" htmlFor="isDirect">Direct Flüg</label>
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
