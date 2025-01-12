import React, { createContext, useState, useContext } from 'react';
const AuthorizationContext = createContext();

export const AuthorizationProvider = ({ children }) => {
    const [authorization, setAuthorization] = useState(null);
    const [user, setUser] = useState(null);

    const setPermissions = (array) => {
        const permission = {
            productManagement: false,
            accountManagement: false,
            orderManagement: false,
            orderAcceptance: false,
            categoryManagement: false,
            reportManagement: false,
            staffManagement: false,
            profileManagement: false,
        }

        array.forEach((item) => {
            permission[item] = true;
        });

        return permission;
    }

    const authorizateUser = (role) => {
        const rolePermissions = {
            "admin": () => setPermissions(["productManagement", "accountManagement", "orderManagement", "categoryManagement", "reportManagement", "staffManagement", "profileManagement"]),
            "manager": () => setPermissions(["productManagement", "orderManagement", "categoryManagement", "reportManagement", "profileManagement"]),
            "shipper": () => setPermissions(["orderAcceptance", "profileManagement"]),
        };


        const permission = rolePermissions[role.toLowerCase()]();
        console.log(permission);
        setAuthorization(permission);
    };

    return (
        <AuthorizationContext.Provider value={{ authorization, authorizateUser, user, setUser }}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export const useAuthorizations = () => useContext(AuthorizationContext);
