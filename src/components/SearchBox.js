import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBox = ({placeholder, searchFunc}) => (
    <div className="searchbox-group position-relative m-0">
        <input type='search' className='form-control searchbox' placeholder={placeholder} onChange={searchFunc}/>
        <span className="search-icon"><FontAwesomeIcon icon={faSearch} style={{color: "bg-success", fontSize: "20px"}}/></span>
    </div>
);

export default SearchBox;