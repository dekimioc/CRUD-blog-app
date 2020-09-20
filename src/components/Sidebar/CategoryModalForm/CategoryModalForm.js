import React from 'react';
import Button from '../../Button/Button';
import "./CategoryModalForm.scss";

const CategoryModalForm = ({ titleCategoryForm, sendCategoryForm, catValueName, changeCatName, addCancelHandler }) => {
    return (
        <div className="categorymodalform-cont">
            <h5>{titleCategoryForm}</h5>
            <form onSubmit={sendCategoryForm}>
                <div className="form-inner-field">
                    <div className="d-flex align-items-start">
                        <p>Name:</p>
                        <input className="ml-2" value={catValueName} onChange={changeCatName} type="text" name="title" required />
                    </div>
                </div>
                <div className="button-container d-flex justify-content-between mx-auto mt-4">
                    <input className="button" type="submit" value="Post" />
                    <Button addEvent={addCancelHandler} addClass="button" buttonText="Cancel" >Cancel</Button>
                </div>
            </form>
        </div>
    )
};

export default CategoryModalForm;