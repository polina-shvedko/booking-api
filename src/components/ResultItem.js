import React from 'react';

export default class ResultItem extends React.Component {
    /**
     *
     * @returns {*}
     */
    render() {

        let response = this.props.item;

        if(typeof response !== 'undefined' && response !== null){
            if(response.hasOwnProperty('ScheduleResource')
                && response.ScheduleResource.hasOwnProperty('Schedule')){
                let schedules = response.ScheduleResource.Schedule;

                let totalZeit = '';
                for(let attribute in schedules){
                    if(schedules.hasOwnProperty(attribute)){
                        let schedule = schedules[attribute];
                        if(schedule.hasOwnProperty('TotalJourney')
                            && schedule.TotalJourney.hasOwnProperty('Duration')){
                            totalZeit = schedule.TotalJourney.Duration;
                        }

                        if(schedule.hasOwnProperty('Flight')){
                            let flug = schedule.Flight;

                            let abfahrt = '';
                            abfahrt = ResultItem.getAbfahrtInfo(flug);

                            let ankunft = '';
                            ankunft = ResultItem.getAnkunftInfo(flug);

                            let flugInfo;
                            flugInfo = ResultItem.getFlugInfo(flug);


                        }
                    }
                }

            }
        }

        return (
            <div className="col-3">
                {this.props.item}
            </div>
        );
    }

    /**
     *
     * @param flug
     * @returns {*}
     */
    static getAbfahrtInfo(flug) {
        let abfahrt;
        if (flug.hasOwnProperty('Departure')) {
            abfahrt = flug.Departure;
        }

        return abfahrt;
    }

    /**
     *
     * @param flug
     * @returns {*}
     */
    static getAnkunftInfo(flug) {
        let ankunft;
        if (flug.hasOwnProperty('Arrival')) {
            ankunft = flug.Arrival;
        }

        return ankunft;
    }

    /**
     *
     * @param flug
     * @returns {string}
     */
    static getFlugInfo(flug) {
        let flugInfo = '';
        let ergebnis = '';
        if (flug.hasOwnProperty('MarketingCarrier')) {
            flugInfo = flug.MarketingCarrier;

            if(flugInfo.hasOwnProperty('AirlineID')){
                ergebnis += flugInfo.AirlineID;
            }

            if(flugInfo.hasOwnProperty('FlightNumber')){
                ergebnis += " " + flugInfo.FlightNumber;
            }
        }

        return ergebnis;
    }
}
