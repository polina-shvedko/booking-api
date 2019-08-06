import React from 'react';
import CitiesList from "./CitiesList";
import Result from "./Result";
import * as axios from "axios";

export default class Form extends React.Component {

    /**
     *
     * @type {{ankunft: string, serverResponse: {}, abfahrt: string, error: null, tagAbfahrt: string, isLoaded: boolean}}
     */
    state = {
        abfahrt: '',
        ankunft: '',
        tagAbfahrt: '',
        error: null,
        isLoaded: false,
        serverResponse: {}
    };

    /**
     *
     */
    preloader: string;

    /**
     *
     * @param e
     */
    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    /**
     *
     * @param e
     */
    onSubmit = e => {
        e.preventDefault();
        this.preloader = <div className={`preloader show`}>
            <div className={`lightbox`}></div>
            <div className={`spinner`}></div>
        </div>;
        this.sendRequest();
    };

    /**
     *
     * @param e
     */
    onReset = e => {
        e.preventDefault();
        this.setState({
            abfahrt: '',
            ankunft: '',
            tagAbfahrt: '',
            error: null,
            isLoaded: false,
            serverResponse: {}
        });
    };

    /**
     *
     * @returns {[]}
     */
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

    /**
     *
     * @param url
     */
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

    /**
     *
     */
    sendRequest() {
        let isDirect = 1;
        let url = 'https://api.lufthansa.com/v1/operations/schedules/' + this.state.abfahrt + '/' + this.state.ankunft + '/' + this.state.tagAbfahrt + '?directFlights=' + isDirect;

        this.sendRequestFlies(url);
    }

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <form method="GET">
                <div className={`alert alert-danger ` + (this.state.error ? `show` : ``)}>{this.state.error}</div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group row">
                            <label htmlFor="abfahrt" className="col-4 col-md-2 col-form-label">Abfahrt von:</label>
                            <div className="col-8 col-md-10">
                                <input id="abfahrt" list="searchAbfahrt" type="text" className="form-control"
                                       name="abfahrt"
                                       value={this.state.abfahrt} onChange={e => this.change(e)}/>
                                <datalist id="searchAbfahrt">
                                    {Form.renderList()}
                                </datalist>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group row">
                            <label htmlFor="ankunft" className="col-4 col-md-2 col-form-label">Ankunft zu:</label>
                            <div className="col-8 col-md-10">
                                <input id="ankunft" list="searchAnkunft" type="text" className="form-control"
                                       name="ankunft"
                                       value={this.state.ankunft} onChange={e => this.change(e)}/>
                                <datalist id="searchAnkunft">
                                    {Form.renderList()}
                                </datalist>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group row">
                            <label htmlFor="tagAbfahrt" className="col-4 col-md-2 col-form-label">Tag des Abfahrts</label>
                            <div className="col-8 col-md-10">
                                <input id="tagAbfahrt" type="date" className="form-control" name="tagAbfahrt"
                                       value={this.state.tagAbfahrt} onChange={e => this.change(e)}/>
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
