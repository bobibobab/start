import React from 'react';
import './comsumption.css';
import { Payment } from './payment';
import { Income } from './income';
import { Dashboard } from './dashboard';

export function Comsumption(prop) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    // Format the date as a string (e.g., "April 12, 2024")
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const userName = prop.userName
    return (
        <main className='comsumption'>
            <div className='date'>
                <h1>{formattedDate}</h1>
                <div className='welcomeUser'><p>Welcome {userName}</p></div>
            </div>

                <div className='PaymentBox'>
                <Payment userName={userName} month={currentMonth}/>
                </div>
                <div className='incomeBox'>
                <Income userName={userName} month={currentMonth} />
                </div>
                <div className='dashboard'>
                <Dashboard userName={userName} />
                </div>
            
        </main>
    );
}
