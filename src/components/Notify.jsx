import React from 'react';
import '../styles/notify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfo, faExclamation, faX } from '@fortawesome/free-solid-svg-icons';
import { useNotification } from './NotificationContext';

function Error({ obj }) {
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
            <div className="nofi__close">
                <FontAwesomeIcon icon={faX} className='icon__nofi' />
            </div>
        </div>
    )
}

function Success({ obj }) {
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
            <div className="nofi__close">
                <FontAwesomeIcon icon={faX} className='icon__nofi' />
            </div>
        </div>
    )
}

function Warning({ obj }) {
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
            <div className="nofi__close">
                <FontAwesomeIcon icon={faX} className='icon__nofi' />
            </div>
        </div>
    )
}

function Notify() {
    const { notification } = useNotification();

    return (
        <div id="nofi">
            {notification && notification.type === 'error' && <Error obj={notification} />}
            {notification && notification.type === 'success' && <Success obj={notification} />}
            {notification && notification.type === 'warning' && <Warning obj={notification} />}
        </div>
    )
}

export default Notify;