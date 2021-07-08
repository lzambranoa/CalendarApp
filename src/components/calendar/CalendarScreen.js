import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';

moment.locale('es');

const localizer = momentLocalizer(moment); 

const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa ',
    notes: 'Comprar el pastel',
    user: {
        _id: '1',
        name: 'Leonardo'
    }
}]



export const CalendarScreen = () => {


    const dispatch = useDispatch();
    // uso del useState para leer la informacion del localstorage
    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    //Creacion de los eventos del calendario

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())

    }

    const onSelectedEvent = (e) => {
        dispatch(eventSetActive())
        dispatch(uiOpenModal())
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        console.log(event, start, end, isSelected);

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <div className="calendar-screen" >
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages= {messages}
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectedEvent}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            <CalendarModal />
        </div>
    )
}