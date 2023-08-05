import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarComponent.css';
import 'moment/locale/es';
const localizer = momentLocalizer(moment);
moment.locale('es');

const events = [
    //{ title: 'Cita', start: new Date(), end: new Date() }
];

const CalendarComponent = () => {
    const eventStyleGetter = (event, start, end, isSelected) => {

    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                eventPropGetter={eventStyleGetter}
                selectable={false}
                resizable={false}
                min={new Date(0, 0, 0, 9, 0, 0)} // Mostrar solo desde las 9 AM
                max={new Date(0, 0, 0, 15, 0, 0)} // Mostrar solo hasta las 3 PM
            />
        </div>
    );
};

export default CalendarComponent;
