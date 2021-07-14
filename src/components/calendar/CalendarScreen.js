import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeletedEventfab } from '../ui/DeletedEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment); 

export const CalendarScreen = () => {


    const dispatch = useDispatch();
    // uso del useState para leer la informacion del localstorage
    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    // Leemos la informacion del los events del store
    const {events, activeEvent} = useSelector( state => state.calendar );

    //Creacion de los eventos del calendario

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())

    }

    const onSelectedEvent = (e) => {
        dispatch(eventSetActive(e))
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent())
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {

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
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            {
                (activeEvent) && <DeletedEventfab />
            }

            <CalendarModal />
        </div>
    )
}