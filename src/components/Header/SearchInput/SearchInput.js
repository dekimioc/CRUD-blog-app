import React from 'react';
import "./SearchInput.scss";

const SearchInput = ({ inputValue, placeholderText }) => {

    return (
        <form>
            <input className="search-input-header" type="text" name="search-input" onChange={inputValue} placeholder={placeholderText} />
        </form>
    )
};

export default SearchInput;