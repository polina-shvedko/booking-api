import React from 'react';
import CitiesList from "./CitiesList";
import Result from "./Result";

export default class Form extends React.Component {

    state = {
        abfahrt: '',
        ankunft: '',
        tagAbfahrt: '',
        numReisenden: '',
        isDirect: 0
    };

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    changeCheckbox = e => {
        let result = 0;
        if(e.target.checked){
            result = 1;
        }
        this.setState({
            [e.target.name]: result
        });
    };

    onSubmit = e => {
        e.preventDefault();
        this.sendRequest();
    };

    result: string;

    static renderList() {
        let cities;
        cities = CitiesList.list;

        let result = [];
        for (let shotCut in cities) {
            let cityName = cities[shotCut];
            result.push(<option value={shotCut}>{cityName}</option>);
        }

        return result;
    };

    sendRequest() {
        let isDirect = typeof this.state.direct ==='undefined'? 0: 1;
        let url = 'https://api.lufthansa.com/v1/operations/schedules/' + this.state.abfahrt + '/' + this.state.ankunft + '/' + this.state.tagAbfahrt + '?directFlights=' + isDirect;

        let result = new Result();
        result.sendRequestFlies(url);

        console.log(url);

    }

    render() {
        return (
            <form method="GET">
                <div className="row">
                    <div className="col-6">
                        <div className="form-group row">
                            <label htmlFor="abfahrt" className="col-4 col-form-label">Abfahrt von:</label>
                            <div className="col-8">
                                <input id="abfahrt" list="searchAbfahrt" type="text" className="form-control" name="abfahrt"
                                       value={this.state.abfahrt} onChange={e => this.change(e)}/>
                                <datalist id="searchAbfahrt">
                                    {Form.renderList()}
                                </datalist>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group row">
                            <label htmlFor="ankunft" className="col-4 col-form-label">Ankunft zu:</label>
                            <div className="col-8">
                                <input id="ankunft" list="searchAnkunft" type="text" className="form-control" name="ankunft"
                                       value={this.state.ankunft} onChange={e => this.change(e)}/>
                                <datalist id="searchAnkunft">
                                    {Form.renderList()}
                                </datalist>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group row">
                            <label htmlFor="tagAbfahrt" className="col-4 col-form-label">Tag des Abfahrts</label>
                            <div className="col-8">
                                <input id="tagAbfahrt" type="date" className="form-control" name="tagAbfahrt"
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
                                           value={this.state.isDirect} onChange={e => this.changeCheckbox(e)}/>
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
