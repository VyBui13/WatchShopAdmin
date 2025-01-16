import React, { createContext, useState, useContext } from 'react';
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const notify = ({ type, msg }) => {
        if (notification !== null) return;

        setNotification({ type, msg });
        setTimeout(() => setNotification(null), 3500);
    };


    return (
        <NotificationContext.Provider value={{ notification, notify, setNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
