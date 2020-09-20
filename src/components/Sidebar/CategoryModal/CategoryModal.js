import React from 'react';
import "./CategoryModal.scss";
import Button from '../../Button/Button';
import ModalForm from '../../ModalForm/ModalForm';

const CategoryModal = ({ catName, catId, created, updated, closeCatModal, deleteCategory, editCategoryName }) => {
    return (
        <>
            <div className="category-modal mt-5 position-relative mb-5" id={catId}>
                <Button addClass="button close-cat-modal" buttonText="X" addEvent={closeCatModal}>Cancel</Button>
                <h4>Name: <strong>{catName}</strong></h4>
                <h4>Id: <strong>{catId}</strong></h4>
                <h5>Created: <strong>{created}</strong></h5>
                <h5>Updated: <strong>{updated}</strong></h5>
                <Button addEvent={editCategoryName} addClass="button" buttonText="Edit" />
                <Button addEvent={deleteCategory} addClass="button" buttonText="Delete" />
            </div>
        </>
    )
};

export default CategoryModal;