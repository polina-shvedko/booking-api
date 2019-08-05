import React from 'react';


export default class ResultItem extends React.Component {
    /**
     *
     * @returns {*}
     */
    render() {

        let response = this.props.item;
        let cards = [];
        if (typeof response !== 'undefined' && response !== null) {
            if (response.hasOwnProperty('ScheduleResource')
                && response.ScheduleResource.hasOwnProperty('Schedule')) {
                let schedules = response.ScheduleResource.Schedule;

                let totalZeit = '';
                for (let attribute in schedules) {
                    if (schedules.hasOwnProperty(attribute)) {
                        let schedule = schedules[attribute];
                        if (schedule.hasOwnProperty('TotalJourney')
                            && schedule.TotalJourney.hasOwnProperty('Duration')) {
                            totalZeit = ResultItem.getDurationFormatted(schedule.TotalJourney.Duration);
                        }

                        if (schedule.hasOwnProperty('Flight')) {
                            let flug = schedule.Flight;

                            let abfahrt = '';
                            abfahrt = ResultItem.getAbfahrtInfo(flug);

                            let ankunft = '';
                            ankunft = ResultItem.getAnkunftInfo(flug);

                            let flugInfo;
                            flugInfo = ResultItem.getFlugInfo(flug);

                            let cardHtml =
                                <div className={`col-12 col-sm-6 col-md-4 p-0`}>
                                    <div className={`row result-item`}>
                                        <div className={`col-12 totalZeit`}>
                                            {totalZeit}
                                        </div>
                                        <div className={`col-6 abfahrt`}>
                                            <p className={`abfahrt`} dangerouslySetInnerHTML={{__html: abfahrt}}></p>
                                        </div>
                                        <div className={`col-6 ankunft`}>
                                            <p className={`ankunft`} dangerouslySetInnerHTML={{__html: ankunft}}></p>
                                        </div>
                                        <div className={`col-12`}>
                                            <p className={`flugInfo`}>{flugInfo}</p>
                                        </div>
                                    </div>
                                </div>;

                            cards.push(cardHtml);
                        }
                    }
                }

            }
        }

        return (
            <div className="row">
                {cards}
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
        let ergebnis = '';
        if (flug.hasOwnProperty('Departure')) {
            abfahrt = flug.Departure;

            if (abfahrt.hasOwnProperty('AirportCode')) {
                ergebnis += abfahrt.AirportCode;
            }

            if (abfahrt.hasOwnProperty('ScheduledTimeLocal') && abfahrt.ScheduledTimeLocal.hasOwnProperty('DateTime')) {
                ergebnis += "<br>" + abfahrt.ScheduledTimeLocal.DateTime;
            }
        }

        return ergebnis;
    }

    /**
     *
     * @param flug
     * @returns {*}
     */
    static getAnkunftInfo(flug) {
        let ankunft;
        let ergebnis = '';
        if (flug.hasOwnProperty('Arrival')) {
            ankunft = flug.Arrival;

            if (ankunft.hasOwnProperty('AirportCode')) {
                ergebnis += ankunft.AirportCode;
            }

            if (ankunft.hasOwnProperty('ScheduledTimeLocal') && ankunft.ScheduledTimeLocal.hasOwnProperty('DateTime')) {
                ergebnis += "<br>" + ankunft.ScheduledTimeLocal.DateTime;
            }
        }

        return ergebnis;
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

            if (flugInfo.hasOwnProperty('AirlineID')) {
                ergebnis += flugInfo.AirlineID;
            }

            if (flugInfo.hasOwnProperty('FlightNumber')) {
                ergebnis += " " + flugInfo.FlightNumber;
            }
        }

        return ergebnis;
    }

    static getDurationFormatted(duration) {
        let res = '';

        let zeitBuschtabe = duration.indexOf('T');
        let tagBuschtabe = duration.indexOf('D');

        let tage = '';

        if(tagBuschtabe !== -1){
            tage = duration.substr(1, tagBuschtabe);
        }

        let stunden = '';
        let minuten = '';

        if (zeitBuschtabe !== -1) {
            let stundenPosition = duration.indexOf('H');
            stunden = duration.substr(2, stundenPosition - 2);

            let minutenPosition = duration.indexOf('M');
            minuten = duration.substr(stundenPosition + 1, minutenPosition - stundenPosition - 1);
        }

        if(tage !== ''){
            res = tage + " Tage " + stunden + " Stunden " + minuten + " Minuten"
        } else {
            res = stunden + " Stunden " + minuten + " Minuten"
        }
        return res;
    }
}
