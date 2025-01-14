// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useNotification } from '../components/NotificationContext';
import { useLoading } from '../components/LoadingContext';

function Login() {
    const { notify } = useNotification();
    const { setIsLoading } = useLoading();
    const [useraccount, setUseraccount] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit() {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('http://localhost:5000/api/user/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userAccount: useraccount, userPassword: password }),
                });

                const data = await res.json();
                notify({ type: data.status, msg: data.message });
                if (data.status === 'success') {
                    navigate('/');
                    return;
                }

            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    };


    return (
        <div className="login-container">
            <div className="login">
                <div className="login__title">
                    <h1>Login</h1>
                    <p>Login to your account</p>
                </div>

                <div className="login__body">
                    <div className="login__input">
                        <FontAwesomeIcon icon={faUser} className='icon__login' />
                        <input type="text" placeholder="Username" value={useraccount} onChange={(e) => setUseraccount(e.target.value)} />
                    </div>

                    <div className="login__input">
                        <FontAwesomeIcon icon={faLock} className='icon__login' />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>

                <div className="login__button">
                    <button onClick={handleSubmit}>
                        <span>Login</span>
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Login;
