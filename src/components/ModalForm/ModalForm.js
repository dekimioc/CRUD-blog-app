import React from 'react';
import './ModalForm.scss';
import Button from '../Button/Button';

const ModalForm = ({ formHeading, titleText, titleTextHandler, textField, textFieldHandler, categoryIdValue, categoryIdValueHandler, sendForm, cancelFormSubmit, isDisabled, isDisabledCatChange }) => {
    return (
        <div className="form-container">
            <div className="d-flex justify-content-between mb-3">
                <h2>{formHeading}</h2>
                <Button addClass="button" buttonText="X" addEvent={cancelFormSubmit}>Cancel</Button>

            </div>
            <form onSubmit={sendForm}>
                <div className="form-inner-field">

                    <div className="d-flex align-items-start">
                        <p>Title:</p>
                        <input className="ml-2" value={titleText} type="text" name="title" onChange={titleTextHandler} required />
                    </div>
                    <div className="mt-2 d-flex align-items-start">
                        <p>Text:</p>
                        <textarea className="ml-2" value={textField} type=" text" name="text" onChange={textFieldHandler} required />
                    </div>
                    <div className="mt-2 d-flex align-items-start">
                        <p>Cat:</p>
                        <input className="ml-2" value={categoryIdValue} type="number" name="number" onChange={categoryIdValueHandler} required disabled={isDisabledCatChange} />
                    </div>
                </div>
                <div className="button-container d-flex justify-content-between mx-auto mt-4">
                    <input className={isDisabled ? "disabledButton" : "submit-button"} type="submit" value="Post" disabled={isDisabled} />
                    <Button addClass="button" buttonText="Cancel" addEvent={cancelFormSubmit}>Cancel</Button>
                </div>
            </form>
        </div>
    )
};

export default ModalForm;