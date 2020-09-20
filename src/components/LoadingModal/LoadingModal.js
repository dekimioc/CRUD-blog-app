import React from 'react';
import "./LoadingModal.scss";

const LoadingModal = () => {
    return (
        <div className="d-flex justify-content-center align-itmes-center loading-modal-cont">
            <div className="spinner-border text-success mr-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <h1 className="text-success">Loading Posts...</h1>
        </div>
    )
}

export default LoadingModal;