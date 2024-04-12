import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ username: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
        }
    }

    return (
        <>
            <div>
                <div className='input-group mb-3'>
                    <span className='input-group-text'>ID</span>
                    <input
                        className='form-control'
                        type='text'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder='UserName'
                    />
                </div>
                <div className='input-group mb-3'>
                    <span className='input-group-text'>🔒</span>
                    <input
                        className='form-control'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password'
                    />
                </div>
                <Button className='btn btn-success' onClick={() => loginUser()}>
                    Login
                </Button>
                <Button variant='secondary' onClick={() => createUser()}>
                    Sign Up
                </Button>
            </div>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}