import React, { useState, useEffect } from 'react';
import './Sidebar.scss';
import axios from 'axios';
import CategoryModal from './CategoryModal/CategoryModal';
import Button from "../Button/Button";
import CategoryModalForm from './CategoryModalForm/CategoryModalForm';
import AppMessage from '../TopContent/AppMessage/AppMessage';

const Sidebar = ({ }) => {
    const [categories, setCategories] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [formOpen, toggleForm] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [clickedCategory, setClickedCategory] = useState(0);
    const [isNew, setIsNew] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorStatus, setErrorStatus] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [appMessage, setAppMessage] = useState("");


    const getCategoryUrl = "https://frontend-api-test-nultien.azurewebsites.net/api/Category";

    useEffect(() => {
        axios.get(getCategoryUrl)
            .then(response => setCategories(response.data.resultData))
            .catch((error) => {
                // handle errors
                setErrorStatus(true)
                setErrorMessage(error.message);
            })
            ;
    }, []);

    const getCategories = () => {
        axios.get(getCategoryUrl)
            .then(response => setCategories(response.data.resultData))
            .catch((error) => {
                // handle errors
                setErrorStatus(true)
                setErrorMessage(error.message);
            });
    }

    const addCategory = () => {
        toggleForm(!formOpen);
        setIsNew(true);
        setCategoryName("");
    }
    const addCategoryHandler = (e) => {
        e.preventDefault();
        setIsNew(true);
        axios.post('https://frontend-api-test-nultien.azurewebsites.net/api/Category', {
            "id": 0,
            "name": categoryName
        }).then(() => {
            setAppMessage("New Category Added!")
            getCategories();
        })

            .catch(function (error) {
                // handle errors
                // setErrorStatus(true)
                // setErrorMessage(error.message);
            });
        toggleForm(false);
        resetCategoryForm();
    }

    const getCategoryDetails = (e) => {
        setClickedCategory((e.currentTarget.getAttribute("id")));
        setIsNew(false);
        axios.get(`${getCategoryUrl}/${(e.currentTarget.getAttribute("id"))}`)
            .then(response => setCategoryData(categoryData => [response.data.resultData]))
            .catch((error) => {
                // handle errors
                setErrorStatus(true)
                setErrorMessage(error.message);
            })
    }
    const closeModalHandler = () => {
        setCategoryData([]);
    }

    const deleteCategory = (e) => {
        e.preventDefault();
        const deleteUrl = 'https://frontend-api-test-nultien.azurewebsites.net/api/Category/';
        axios.delete(deleteUrl + clickedCategory)
            .then(() => {
                getCategories();
            })
            .then(() => {
                setAppMessage("Category Deleted");
            })
            .catch((error) => {
                // handle errors
                setErrorStatus(true)
                setErrorMessage(error.message);
            })
        getCategories();
        closeModalHandler();
    }

    const resetCategoryForm = () => {
        setCategoryName("");
    }

    const editCategory = (e) => {
        e.preventDefault();
        console.log(clickedCategory);
        axios.put(`${getCategoryUrl}/${clickedCategory}`, {
            "id": clickedCategory,
            "name": categoryName
        })
            .then(function () {
                getCategories();
                resetCategoryForm();
                toggleForm(false);
                setAppMessage("Category Edited Succesfully!");
            })
            .catch(function (error) {
                // handle errors
                // setErrorStatus(true)
                // setErrorMessage(error.message);
            });
    }

    const closeMessageHandler = () => {
        setAppMessage("");
    }

    const addPost = <CategoryModalForm titleCategoryForm="Add Category" addCancelHandler={addCategory} sendCategoryForm={addCategoryHandler} catValueName={categoryName} changeCatName={(e) => setCategoryName(e.target.value)} />;

    const editPost = <CategoryModalForm titleCategoryForm="Edit Category" sendCategoryForm={editCategory} addCancelHandler={addCategory} catValueName={categoryName} changeCatName={(e) => setCategoryName(e.target.value)} />;

    return (
        <div className="col-md-4 col-lg-4 col-sm-12 col-12">
            {appMessage === "" ? null : <AppMessage closeMessage={closeMessageHandler} message={appMessage} />}
            <Button addClass="button" buttonText="Add Category" addEvent={addCategory} />

            <div className="main-sidebar mt-4">
                <h2 className="mb-3">Categories:</h2>

                {categories.length <= 0 ? <h2>There is no categories on this API!</h2> : categories.map(category => <h2 className="category-link" onClick={(e) => { getCategoryDetails(e); }} id={category.id} key={category.id}>{category.name}</h2>)}
                {categoryData.length > 0 ? categoryData.map(cat => <CategoryModal editCategoryName={() => toggleForm(true)} deleteCategory={(e) => deleteCategory(e)} key={cat.id} catName={cat.name} catId={cat.id} created={cat.createdAt} updated={cat.updatedAt} closeCatModal={closeModalHandler} />) : null}

                {formOpen ? (isNew ? addPost : editPost) : null}
            </div></div>
    )
}



export default Sidebar;