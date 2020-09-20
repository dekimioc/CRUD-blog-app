import React from 'react';
import './AppMessage.scss';
import Button from '../../Button/Button';

const AppMessage = ({ message, closeMessage }) => {
    return (
        <div className="d-flex justify-content-between message-container align-items-center mt-3 mb-3 pl-2 pr-2 pt-3 pb-3">
            <h1>{message}</h1>
            <Button addClass="button" buttonText="X" addEvent={closeMessage} />

        </div>
    )
};

export default AppMessage;