import React from 'react';
import "./Button.scss";

const Button = ({ addEvent, buttonText, sharedId, addClass, categId }) => {
    return (
        <button catid={categId} id={sharedId} className={addClass} onClick={addEvent}>{buttonText}</button>
    )
};

export default Button;