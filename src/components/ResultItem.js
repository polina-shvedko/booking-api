import React from 'react';

/**
 *
 */
export default class ResultItem extends React.Component {
    //* Generiert Reackt specifisch html mit Flug Information
    render() {
//* props - данные из коспонента который тебя вызывал
        let response = this.props.item; //* ответ от сервера который нам был передан из предыдущего компонента
        let cards = [];
        if (typeof response !== 'undefined' && response !== null) {
            if (response.hasOwnProperty('ScheduleResource') //* если имеет ответ ключ ScheduleResource
                && response.ScheduleResource.hasOwnProperty('Schedule')) {
                let schedules = response.ScheduleResource.Schedule;

                let totalZeit = '';
                for (let attribute in schedules) { //* скедьюлз расписание
                    if (schedules.hasOwnProperty(attribute)) {
                        let schedule = schedules[attribute]; //* вытягиваем элемент одного расписания
                        if (schedule.hasOwnProperty('TotalJourney')
                            && schedule.TotalJourney.hasOwnProperty('Duration')) {
                            totalZeit = ResultItem.getDurationFormatted(schedule.TotalJourney.Duration);
                        } //* то общее время равно результату нашей функции

                        if (schedule.hasOwnProperty('Flight')) {
                            let flug = schedule.Flight;

                            let abfahrt = '';
                            abfahrt = ResultItem.getAbfahrtInfo(flug); //* в функцию передаем объект расписания самолета
                            //* а функция возвращает строку с датой и временем отправления

                            let ankunft = '';
                            ankunft = ResultItem.getAnkunftInfo(flug);

                            let flugInfo;
                            flugInfo = ResultItem.getFlugInfo(flug); //* номер самолета

                            let cardHtml =
                                <div className={`col-12 col-sm-6 col-md-4 p-0`}>
                                    <div className={`row result-item align-items-center`}>
                                        <div className={`col-12 totalZeit mb-3`}>
                                            <p className={`mb-0 title`}>Flugdauer</p>
                                            {totalZeit}
                                        </div>
                                        <div className={`col-4 abfahrt`}>
                                            <p className={`mb-0 title`}>Abfahrt</p>
                                            {/* Вывод в теге хтмл а не строку */}
                                            <p className={`abfahrt`} dangerouslySetInnerHTML={{__html: abfahrt}}></p>
                                        </div>
                                        <div className={`col-4 text-center`}>
                                            <i className="fas fa-chevron-right fa-3x"></i>
                                        </div>
                                        <div className={`col-4 ankunft`}>
                                            <p className={`mb-0 title`}>Ankunft</p>
                                            <p className={`ankunft`} dangerouslySetInnerHTML={{__html: ankunft}}></p>
                                        </div>
                                        <div className={`col-12`}>
                                            <p className={`mb-0 title`}>Flug Info</p>
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

    //* Generiert die Abfart Info
    static getAbfahrtInfo(flug) {
        let abfahrt;
        let ergebnis = '';
        if (flug.hasOwnProperty('Departure')) {
            abfahrt = flug.Departure;

            if (abfahrt.hasOwnProperty('AirportCode')) {
                ergebnis += abfahrt.AirportCode;
            }

            if (abfahrt.hasOwnProperty('ScheduledTimeLocal') && abfahrt.ScheduledTimeLocal.hasOwnProperty('DateTime')) {
                ergebnis += "<br>" + ResultItem.getTimeFormatted(abfahrt.ScheduledTimeLocal.DateTime) + "<br>" + ResultItem.getDateFormatted(abfahrt.ScheduledTimeLocal.DateTime);
            }
        }

        return ergebnis;
    }

    //* Generiert die Ankunft Info
    static getAnkunftInfo(flug) {
        let ankunft;
        let ergebnis = '';
        if (flug.hasOwnProperty('Arrival')) {
            ankunft = flug.Arrival;

            if (ankunft.hasOwnProperty('AirportCode')) {
                ergebnis += ankunft.AirportCode;
            }

            if (ankunft.hasOwnProperty('ScheduledTimeLocal') && ankunft.ScheduledTimeLocal.hasOwnProperty('DateTime')) {
                ergebnis += "<br>" + ResultItem.getTimeFormatted(ankunft.ScheduledTimeLocal.DateTime) + "<br>" + ResultItem.getDateFormatted(ankunft.ScheduledTimeLocal.DateTime);
            }
        }

        return ergebnis;
    }

    //* Generiert FlügInfo mit Operator Abkürzung und FlügNummer -номер самолета
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

    //* machen DauertZeit von Flüg zum Aussicht tag + stunde + minuten
    static getDurationFormatted(duration) {
        let res = '';

        let zeitBuschtabe = duration.indexOf('T');
        let tagBuschtabe = duration.indexOf('D');

        let tage = '';

        if (tagBuschtabe !== -1) {
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

        if (tage !== '') {
            res = tage + " T. " + stunden + " St. " + minuten + " Min."
        } else if(minuten !== '') {
            res = stunden + " St. " + minuten + " Min."
        } else if(minuten === ''){
            res = stunden + " Stunden";
        }
        return res;
    }

    //*Formatieren Zeit von LH Format zum unserem Format
    static getTimeFormatted(duration) { //* продолжительность
        let zeit = '';
        let zeitBuschtabe = duration.indexOf('T');

        if (zeitBuschtabe !== -1) {
            zeit = duration.substr(zeitBuschtabe + 1, duration.length - 1);
        }

        return zeit;
    }

    //* Formatieren Datum von LH Format zum unserem Format
    static getDateFormatted(duration) {
        let date = '';
        let zeitBuschtabe = duration.indexOf('T');

        if (zeitBuschtabe !== -1) {
            date = duration.substr(0, zeitBuschtabe);
        }

        return date;
    }
}
