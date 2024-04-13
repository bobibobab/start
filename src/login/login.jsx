import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {

    return (
        <main className='text-center'>
            <div>
                {authState !== AuthState.Unknown && 
                    <div className='MainScreen'>
                        <h1> Welcome to MoneyMom</h1>
                        <div className="quote">
                            <p>"A fool and his moeny are some parted."</p>
                        </div>
                    </div>

                }

                {authState === AuthState.Authenticated && (
                    
                    <Authenticated userName={userName} onLogout = {() => 
                        onAuthChange(userName, AuthState.Unauthenticated)}/>
                )}
                {authState === AuthState.Unauthenticated && (
                    <Unauthenticated
                        userName={userName}
                        onLogin={(loginUserName) => {
                            onAuthChange(loginUserName, AuthState.Authenticated);
                        }}
                    />
                    
                )}
            </div>
        </main>
    );
}

function displayQuote(data) {
    fetch('https://api.quotable.io/random')
        .then((response) => response.json())
        .then((data) => {
            const containerEl = document.querySelector('.quote');

            const pElement = containerEl.querySelector('p');

            pElement.textContent = data.content;

        });
}

function setDisplay(controlId, display) {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
        playControlEl.style.display = display;
    }
}

displayQuote();
