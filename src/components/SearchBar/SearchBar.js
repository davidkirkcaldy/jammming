/*
 *   Copyright (c) 2025 David Kirkcaldy
 *   All rights reserved.
 */
import React, {useState} from 'react';
import classes from './SearchBar.module.css';

const SearchBar = ({searchSpotify}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = (event) => {
        searchSpotify(searchTerm);
    };

    const handleChange = ({target}) => {
        const {value} = target;
        setSearchTerm(value);
    };

    return (
        <div className={classes.searchContainer}>
            <input 
                className={classes.searchText}
                onChange={handleChange} 
                type='text' 
                placeholder='Search Spotify...' />
            <button 
                    className={classes.searchBtn} 
                    onClick={handleClick}>
                        Search
            </button>
       </div>
    );
}

export default SearchBar;
