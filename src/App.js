import React, { useState } from 'react';
import './App.css';
import Container from './components/Container/Container';
import Sidebar from './components/Sidebar/Sidebar';
import TopContent from './components/TopContent/TopContent';
import Header from './components/Header/Header';
import PostCard from './components/CardsWrapper/PostCard/PostCard';

function App() {
  const [inputValue, setInputValue] = useState('');

  const headerInputHandler = (e) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
  }

  return (
    <>
      <Header inputValue={(e) => headerInputHandler(e)} />
      <Container>
        <TopContent />
        <Sidebar />
        <div className="col-md-8 col-lg-8 col-sm-12 col-12 ">
          <PostCard headerValue={inputValue} />
        </div>
      </Container>
    </>
  );
}

export default App;
