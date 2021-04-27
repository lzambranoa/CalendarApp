import React from 'react';

export const CalendarEvent = ({ event }) => {
    console.log(event)
    const { title, user } = event; 
    return(
        <div>
            <strong>{ title }<br/></strong>
            <span>_{ user.name }</span>
        </div>
    )
}