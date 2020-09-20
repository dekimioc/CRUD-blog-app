import React from 'react';
import "./ErrorModal.scss";

const ErrorModal = ({ errorText }) => {
    return (
        <div className="error-message-container text-center mt-5">
            <h2>Something went wrong!</h2>
            <h1 className="color-error">{errorText}</h1>
        </div>
    )
}

export default ErrorModal;