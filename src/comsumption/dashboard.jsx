import React, { useState, useEffect } from 'react';
import { Paied, GameNotifier } from './notifier';

export function Dashboard(props) {
    const userName = props.userName;

    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        GameNotifier.addHandler(handlePaymentEvent);

        return () => {
            GameNotifier.removeHandler(handlePaymentEvent);
        };
    });

    function handlePaymentEvent(event) {
        setEvent([...events, event]);
    }

    function createMessageArray() {
        const messageArray = [];
        console.log("arra");
        for (const [i, event] of events.entries()) {
            console.log(event);
            let message = 'unknown';

            

            messageArray.push(
                <div key={i} className='event'>
                    <span className={'player-event'}> {event.from} paid {event.value}</span>
                </div>
            );
        }
        return messageArray;
    }
    
    return(
        <div className='Dashboard'>
            User: 
            <span className='player-name'>{userName}</span>
            <div id='player-messages'>{createMessageArray()}</div>
        </div>
    );
}