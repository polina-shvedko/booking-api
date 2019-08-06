import React from 'react';
import CitiesList from "./CitiesList";
import Result from "./Result";
import * as axios from "axios";

export default class Form extends React.Component {

    state = {
        abfahrt: '',
        ankunft: '',
        tagAbfahrt: '',
        numReisenden: '',
        error: null,
        isLoaded: false,
        serverResponse: {}
    };

    preloader: string;

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    changeCheckbox = e => {
        let result = 0;
        if (e.target.checked) {
            result = 1;
        }
        this.setState({
            [e.target.name]: result
        });
    };

    onSubmit = e => {
        e.preventDefault();
        this.preloader = <div className={`preloader show`}>
            <div className={`lightbox`}></div>
            <div className={`spinner`}></div>
        </div>;
        this.sendRequest();
    };

    onReset = e => {
        e.preventDefault();
        this.setState({
            abfahrt: '',
            ankunft: '',
            tagAbfahrt: '',
            numReisenden: '',
            error: null,
            isLoaded: false,
            serverResponse: {}
        });
    };

    static renderList() {
        let cities;
        cities = CitiesList.list;

        let result = [];
        for (let shotCut in cities) {
            if (cities.hasOwnProperty(shotCut)) {
                let cityName = cities[shotCut];
                result.push(<option value={shotCut}>{cityName}</option>);
            }

        }

        return result;
    };

    sendRequestFlies(url) {
        let apiKey = localStorage.getItem('keyAPI') || null;
        axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            }
        }).then((response) => {
                this.preloader = '';
                this.setState({
                    isLoaded: true,
                    serverResponse: response.data,
                    error: ''
                });
            }
        )
            .catch((response) => {
                let error = '';
                if(response.hasOwnProperty('response') && response.response.hasOwnProperty('status')){
                    switch (response.response.status) {
                        case 404:
                            error = 'Kein Flug wurde gefunden!';
                            break;
                        case 500:
                            error = 'Server Fehler!';
                            break;
                        default:
                            error = 'Kein Flug wurde gefunden!';
                            break;
                    }
                }
                this.preloader = '';
                this.setState({
                    isLoaded: false,
                    error: error
                });
            });
    }

    sendRequest() {
        let isDirect = 1;
        let url = 'https://api.lufthansa.com/v1/operations/schedules/' + this.state.abfahrt + '/' + this.state.ankunft + '/' + this.state.tagAbfahrt + '?directFlights=' + isDirect;

        this.sendRequestFlies(url);
    }

    render() {
        return (
            <form method="GET">
                <div className={`alert alert-danger ` + (this.state.error ? `show` : ``)}>{this.state.error}</div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group row">
                            <label htmlFor="abfahrt" className="col-4 col-form-label">Abfahrt von:</label>
                            <div className="col-8">
                                <input id="abfahrt" list="searchAbfahrt" type="text" className="form-control"
                                       name="abfahrt"
                                       value={this.state.abfahrt} onChange={e => this.change(e)}/>
                                <datalist id="searchAbfahrt">
                                    {Form.renderList()}
                                </datalist>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group row">
                            <label htmlFor="ankunft" className="col-4 col-form-label">Ankunft zu:</label>
                            <div className="col-8">
                                <input id="ankunft" list="searchAnkunft" type="text" className="form-control"
                                       name="ankunft"
                                       value={this.state.ankunft} onChange={e => this.change(e)}/>
                                <datalist id="searchAnkunft">
                                    {Form.renderList()}
                                </datalist>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group row">
                            <label htmlFor="tagAbfahrt" className="col-4 col-form-label">Tag des Abfahrts</label>
                            <div className="col-8">
                                <input id="tagAbfahrt" type="date" className="form-control" name="tagAbfahrt"
                                       value={this.state.tagAbfahrt} onChange={e => this.change(e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
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
                                <button onClick={e => this.onReset(e)} className="btn btn-danger">Zurücksetzen</button>
                            </div>
                            <div className="col-6 text-right">
                                <button onClick={e => this.onSubmit(e)} className="btn btn-success">Suchen</button>
                            </div>
                        </div>
                    </div>

                </div>

                <Result item={this.state.serverResponse}/>
                {this.preloader}
            </form>

        );
    }
}
