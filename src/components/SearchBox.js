import React from 'react';

const SearchBox = ({placeholder, searchFunc}) => (
    <input type='search' className='form-control' placeholder={placeholder} onChange={searchFunc}/>
);

export default SearchBox;