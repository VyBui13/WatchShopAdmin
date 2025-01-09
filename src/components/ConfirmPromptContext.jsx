import React, { createContext, useState, useContext } from 'react';
const ConfirmPromptContext = createContext();

export const ConfirmPromptProvider = ({ children }) => {
    const [isConfirmPrompt, setIsConfirmPrompt] = useState(false);
    const [confirmPromptData, setConfirmPromptData] = useState({
        message: "",
        action: "",
        onConfirm: () => { },
    });

    return (
        <ConfirmPromptContext.Provider value={{ isConfirmPrompt, setIsConfirmPrompt, confirmPromptData, setConfirmPromptData }}>
            {children}
        </ConfirmPromptContext.Provider>
    );
};

export const useConfirmPrompt = () => useContext(ConfirmPromptContext);
