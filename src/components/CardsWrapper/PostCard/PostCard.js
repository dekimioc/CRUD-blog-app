import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostCard.scss';
import Button from '../../Button/Button';
import ModalForm from '../../ModalForm/ModalForm';
import AppMessage from '../../TopContent/AppMessage/AppMessage';
import avatarImage from '../../../assets/imgs/placeholder80.png'
import { imgs } from './imgdata';
import LoadingModal from '../../LoadingModal/LoadingModal';
import ErrorModal from '../../ErrorModal/ErrorModal'

const PostCard = (props) => {
    const [posts, setPosts] = useState([]);
    const [formOpen, toggleForm] = useState(false);
    const [clickedId, setClickedId] = useState(null);
    const [categoryId, setCategoryId] = useState(0);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [id, setId] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [appMessage, setAppMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorStatus, setErrorStatus] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Main URL
    const getPostsUrl = "https://frontend-api-test-nultien.azurewebsites.net/api/BlogPosts";
    const searchPostsUrl = "https://frontend-api-test-nultien.azurewebsites.net/api/BlogPosts/Search";

    // Get posts from API 
    useEffect(() => {
        axios.get(getPostsUrl)
            .then(response =>
                setPosts(response.data.resultData))
            .then(() => {
                setIsLoaded(true);
            })
            .catch(function (error) {
                // handle errors
                setErrorStatus(true)
                setErrorMessage(error.message);
                console.log(errorMessage)
            });

    }, [errorMessage])

    // Delete Post request
    const deletePost = (e) => {
        e.stopPropagation();
        const url = `https://frontend-api-test-nultien.azurewebsites.net/api/BlogPosts/`;

        axios.delete(url + e.currentTarget.getAttribute("id"))
            .then(() => {
                getPosts();
            })
            .then(() => {
                setAppMessage("Post Deleted");
            })
            .catch((error) => {
                // handle errors
                setErrorStatus(true)
                setErrorMessage(error.message);
            })
    }

    // Helper method for getting card ID on click for deleteing request and for the edit request
    const getPostId = (e) => {
        toggleForm(true);
        setTitle(e.currentTarget.parentNode.parentNode.parentNode.getAttribute("datatitle"));
        setText(e.currentTarget.parentNode.parentNode.parentNode.getAttribute("datatext"))
        return e.currentTarget.parentNode.getAttribute("id");
    }

    // Helper Method for getting all posts when some change is made on API
    const getPosts = () => {
        axios.get(getPostsUrl)
            .then(response => setPosts(response.data.resultData))
            .catch((error) => {
                // handle errors
                setErrorStatus(true)
                setErrorMessage(error.message);
            })
    }
    // Add New Post 
    const addPost = (e) => {
        e.preventDefault();
        toggleForm(true);
        axios.post(getPostsUrl, {
            "title": title,
            "text": text,
            "categoryId": categoryId
        })
            .then(function () {
                getPosts();
                setAppMessage("New Post Succesfully Added!")

            })
            .catch(function (error) {
                // handle errors
                setErrorStatus(true)
                setErrorMessage(error.message);
            });
        toggleForm(false);
        resetForm();

    }
    // Function for editing post
    const editPost = (e) => {
        toggleForm(true);
        e.preventDefault();
        axios.put(`${getPostsUrl}/${clickedId}`, {
            "id": clickedId,
            "title": title,
            "text": text,
            "categoryId": categoryId
        })
            .then(function () {
                getPosts();
                setAppMessage("Post Edited Succesfully!");
            })
            .catch(function (error) {
                // handle errors
                setErrorStatus(true)
                setErrorMessage(error.message);
            });
        resetForm();
    }

    const getGlobalId = (e) => {
        setClickedId(e.currentTarget.getAttribute("id"));
    }
    const getCategoryIdHandler = (e) => {
        setCategoryId(e.currentTarget.getAttribute("catId"));
    }

    const resetForm = () => {
        setTitle("");
        setText("");
        setCategoryId("");
        toggleForm(false);
    }

    const closeMessageHandler = () => {
        setAppMessage("");
    }

    // Form for adding new post
    const addNewPostForm = <ModalForm
        formHeading="Add Post"
        className="test"
        titleText={title}
        titleTextHandler={(e) => setTitle(e.target.value)}
        textField={text}
        textFieldHandler={(e) => setText(e.target.value)}
        categoryIdValue={categoryId}
        categoryIdValueHandler={(e) => setCategoryId(e.target.value)}
        sendForm={addPost}
        cancelFormSubmit={resetForm}
        isDisabled={title === "" && text === "" ? true : false}
        isDisabledCatChange={false} />;
    // Form for editing post
    const editPostForm = <ModalForm
        formHeading="Edit Post"
        titleText={title}
        titleTextHandler={(e) => setTitle(e.target.value)}
        textField={text}
        textFieldHandler={(e) => setText(e.target.value)}
        categoryIdValue={categoryId}
        categoryIdValueHandler={(e) => setCategoryId(e.target.value)}
        sendForm={editPost}
        cancelFormSubmit={resetForm}
        isDisabled={title === "" || text === "" ? true : false}
        isDisabledCatChange={true} />

    // Messages when there is no posts
    const noPosts = <h1 className="mt-5 text-center">There is no Posts on API! Please add some posts!</h1>;
    const noFilteredPosts = <h1 className="mt-5 text-center">There is no Posts with this title!</h1>;

    // Posts Cards from state inititalized
    const postsCard = posts.map((post, index) => (<div key={post.id} className={index % 2 === 0 ? "card-white" : "card"} datatitle={post.title} datatext={post.text} dataid={post.categoryId} id={post.id} onClick={props.idShow, props.formToggle, getGlobalId
    }>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex flex-wrap">
                <img className="mr-4" src={avatarImage} alt="" />
                <div className="title-container mt-4">
                    <h2 className="title" key={post.title}>{post.title}</h2>
                    <p className="createdAt" key={post.createdAt}>Created at: <strong>{post.createdAt}</strong></p>
                </div>
            </div>
            <div className="mt-3 mb-3">
                <Button addClass="button" buttonText="Delete" sharedId={post.id} addEvent={deletePost}>Delete</Button>
                <Button addClass="button" buttonText="Edit" categId={post.categoryId} test3={categoryId} addEvent={(e) => { setIsNew(false); getPostId(e); getCategoryIdHandler(e); }}>Edit</Button>
            </div>
        </div>
        {/* <p className="categoryID" key={post.categoryId}>{post.categoryId} </p> */}

        {/* <p className="postId" key={post.id}>{post.id}</p> */}
        <p className="text mt-3" key={post.text}>{post.text}</p>
        <p className="updatedAt" key={post.updatedAt}>Updated at: <strong>{post.updatedAt}</strong></p>
        <div className="d-flex justify-content-center flex-wrap">
            {imgs.map(img => <img key={img.key} className="mr-2 ml-2 mb-2 mt-2" src={img.imageSrc} alt={img.altTag} />)}
        </div>
    </div >
    ));
    console.log(posts);

    // filtering Cards Elements from search input
    const filteredCards = postsCard.filter(item => item.props.datatitle.toLowerCase().includes(props.headerValue.toLowerCase()));

    if (errorStatus) {
        return <ErrorModal errorText={errorMessage} />
    }
    else if (!isLoaded) {
        return <LoadingModal />
    }
    else {
        return (
            <>
                <div className="position-relative">
                    {/* <button onClick={showCards}>aaaaa</button> */}
                    {appMessage === "" ? null : <AppMessage closeMessage={closeMessageHandler} message={appMessage} />}
                    <Button addClass="button" buttonText="Add Post" addEvent={() => { setIsNew(true); toggleForm(true) }} />

                    {posts.length <= 0 ? noPosts : (filteredCards.length === 0 ? noFilteredPosts : filteredCards)}
                    {formOpen ?
                        (isNew ? addNewPostForm : editPostForm) : null}
                </div>
            </>
        )
    }


};

export default PostCard;