import React from 'react';
import '../styles/notify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfo, faExclamation, faX } from '@fortawesome/free-solid-svg-icons';
import { useNotification } from './NotificationContext';

function Error({ obj, setNotification }) {
    console.log(obj);
    return (
        <div className="nofi nofi--error">
            <div className="nofi__icon">
                <FontAwesomeIcon icon={faInfo} className='icon__nofi' />

            </div>
            <div className="nofi__content">
                <div className="nofi__content__title">
                    {obj.type}
                </div>
                <div className="nofi__content__msg">
                    {obj.msg}
                </div>
            </div>
            <div className="nofi__close" onClick={() => setNotification(null)}>
                <FontAwesomeIcon icon={faX} className='icon__nofi' />
            </div>
        </div>
    )
}

function Success({ obj, setNotification }) {
    return (
        <div className="nofi nofi--success">
            <div className="nofi__icon">
                <FontAwesomeIcon icon={faCheck} className='icon__nofi' />
            </div>
            <div className="nofi__content">
                <div className="nofi__content__title">
                    {obj.type}
                </div>
                <div className="nofi__content__msg">
                    {obj.msg}
                </div>
            </div>
            <div className="nofi__close" onClick={() => setNotification(null)}>
                <FontAwesomeIcon icon={faX} className='icon__nofi' />
            </div>
        </div>
    )
}

function Warning({ obj, setNotification }) {
    return (
        <div className="nofi nofi--warning">
            <div className="nofi__icon">
                <FontAwesomeIcon icon={faExclamation} className='icon__nofi' />
            </div>
            <div className="nofi__content">
                <div className="nofi__content__title">
                    {obj.type}
                </div>
                <div className="nofi__content__msg">
                    {obj.msg}
                </div>
            </div>
            <div className="nofi__close" onClick={() => setNotification(null)}>
                <FontAwesomeIcon icon={faX} className='icon__nofi' />
            </div>
        </div>
    )
}

function Notify() {
    const { notification, setNotification } = useNotification();

    return (
        <div id="nofi">
            {notification && notification.type === 'error' && <Error obj={notification} setNotification={setNotification} />}
            {notification && notification.type === 'success' && <Success obj={notification} setNotification={setNotification} />}
            {notification && notification.type === 'warning' && <Warning obj={notification} setNotification={setNotification} />}
        </div>
    )
}

export default Notify;