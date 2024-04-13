import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
        })
            .catch(() => {
                // Logout failed. Assuming offline
            })
            .finally(() => {
                localStorage.removeItem('userName');
                props.onLogout();
                navigate('/');
            });
    }

    return (
        <div>
            <div className='userName'>{props.userName}</div>
            <Button variant='btn btn-success' onClick={() => navigate('/comsumption')}>
                Comsumption
            </Button>
            <Button variant='secondary' onClick={() => logout()}>
                Logout
            </Button>
        </div>

    );


}