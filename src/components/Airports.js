import React from 'react';

export default class Airports extends React.Component {
    airportsObject: Object;
    airports: Object;
    airportsList: [];
    airport: [];

    render() {

        this.airportsObject = this.props.values;

        if(typeof this.airportsObject != "undefined" && this.airportsObject !== null && this.airportsObject.hasOwnProperty('NearestAirportResource')
            && this.airportsObject.NearestAirportResource.hasOwnProperty('Airports')
            && this.airportsObject.NearestAirportResource.Airports.hasOwnProperty('Airport')){
            this.airportsList = this.airportsObject.NearestAirportResource.Airports.Airport;

            this.airports = [];

            for (let i = 0; i < this.airportsList.length; i++){
                if(this.airportsList[i].hasOwnProperty('AirportCode')
                    && this.airportsList[i].hasOwnProperty('CityCode')){
                    this.airport = [];
                    this.airport.push({code: this.airportsList[i].AirportCode});
                    this.airport.push({cityCode:  this.airportsList[i].CityCode});
                    this.airports.push(this.airport);
                }
            }
            localStorage.setItem('airports', this.airports);

        }

        return ('');
    }
}
