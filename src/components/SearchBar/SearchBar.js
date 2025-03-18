/*
 *   Copyright (c) 2025 David Kirkcaldy
 *   All rights reserved.
 */
import React, { useState } from 'react';
import classes from './SearchBar.module.css';

const SearchBar = ({getSearchTerm}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = (event) => {
        getSearchTerm(searchTerm);
    };

    const handleChange = ({target}) => {
        const {value} = target;
        setSearchTerm(value);
    };

    return (
        <div className={classes.searchContainer}>
            <div className={classes.searchText}>
                <input 
                    onChange={handleChange} 
                    type='text' 
                    placeholder='Search Spotify...' 
                    value={searchTerm}/>
            </div>
            <div className={classes.searchBtn} >
                <button 
                        onClick={handleClick}>
                            Search
                </button>
            </div>
       </div>
    );
}

export default SearchBar;
