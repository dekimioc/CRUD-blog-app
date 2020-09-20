import React, { useState, useEffect } from "react";
import "./Header.scss";

import SearchInput from './SearchInput/SearchInput';




const Header = ({ inputValue }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth <= 992) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [windowWidth]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);



    const handleMenuOpen = (e) => {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="container-fluid main-header">
            <div className="row align-items-center pt-3 pb-3">
                <div className="col-md-4 col-sm-4 col-4 col-xs-4">
                    <h4 className="text-white">Blog</h4>
                </div>
                <div className="col-md-8 col-sm-8 col-8 col-xs-8">
                    {!isMobile ? <div className="search-list-input d-flex align-items-center justify-content-end">
                        <SearchInput inputValue={inputValue} placeholderText="Search Posts" />
                        <ul className="d-flex header-list justify-content-between mb-0">
                            <li><a className="text-white header-link" href="/">Link 1</a></li>
                            <li><a className="text-white header-link" href="/">link 2</a></li>
                            <li><a className="text-white header-link" href="/">Link 3</a></li>
                            <li><a className="text-white header-link" href="/">My Profile</a></li>
                            <li><a className="text-white header-link" href="/">Logout</a></li>
                        </ul>
                    </div> : <div>
                            <div>
                                <a id="nav-toggle" href="/" onClick={handleMenuOpen}><span></span></a>
                                <div className="text-right mr-5 mobile-input">
                                    <SearchInput inputValue={inputValue} placeholderText="Search Posts" />
                                </div>
                            </div>
                            {menuOpen ? <div className="mobile-menu text-right position-absolute">
                                <ul className="header-list flex-column justify-content-between mb-0 pl-0 mt-3">
                                    <li><a className="text-white header-link" href="/">Link 1</a></li>
                                    <li><a className="text-white header-link" href="/">link 2</a></li>
                                    <li><a className="text-white header-link" href="/">Link 3</a></li>
                                    <li><a className="text-white header-link" href="/">My Profile</a></li>
                                    <li><a className="text-white header-link" href="/">Logout</a></li>
                                </ul>
                            </div> : null}

                        </div>}
                </div>
            </div>
        </div>
    )
};

export default Header;