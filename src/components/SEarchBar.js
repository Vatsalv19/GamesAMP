// components/SearchBar.js
import React, { useState, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchGames, fetchSearchResults, setSearchQuery } from '../redux/slices/gamesSlice';

import '../styles/SearchBar.css';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();


  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (search) {
        dispatch(setSearchQuery(search));
        dispatch(fetchSearchResults(search));
        console.log(fetchGames, fetchSearchResults, setSearchQuery);
      } else {
        dispatch(setSearchQuery(''));
        dispatch(fetchGames({ page_size: 20 }));
        console.log(fetchGames, fetchSearchResults, setSearchQuery);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search, dispatch]);

  return (
    <div className="search-container">
      <InputGroup>
        <Form.Control
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
    </div>
  );
};

export default SearchBar;