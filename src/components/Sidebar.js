// components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchGames } from '../redux/slices/gamesSlice';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const currentFilters = useSelector(state => state.games.filters);
  
  const [filters, setLocalFilters] = useState({
    category: currentFilters.category || '',
    tags: currentFilters.tags || [],
    year: currentFilters.year || '',
    ordering: currentFilters.ordering || '-rating'
  });

  const genres = [
    { id: 4, name: 'Action' },
    { id: 3, name: 'Adventure' },
    { id: 5, name: 'RPG' },
    { id: 2, name: 'Shooter' },
    { id: 10, name: 'Strategy' },
    { id: 14, name: 'Simulation' },
    { id: 15, name: 'Sports' },
    { id: 7, name: 'Puzzle' }
  ];

  const tags = [
    { id: 31, name: 'Singleplayer' },
    { id: 7, name: 'Multiplayer' },
    { id: 32, name: 'Atmospheric' },
    { id: 16, name: 'Horror' },
    { id: 40, name: 'Dark Fantasy' },
    { id: 44, name: 'Open World' }
  ];

  const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

  const handleCategoryChange = (e) => {
    setLocalFilters({...filters, category: e.target.value});
  };

  const handleTagChange = (tagId) => {
    const newTags = filters.tags.includes(tagId)
      ? filters.tags.filter(id => id !== tagId)
      : [...filters.tags, tagId];
    
    setLocalFilters({...filters, tags: newTags});
  };

  const handleYearChange = (e) => {
    setLocalFilters({...filters, year: e.target.value});
  };

  const handleOrderingChange = (e) => {
    setLocalFilters({...filters, ordering: e.target.value});
  };

  const applyFilters = () => {
    dispatch(setFilters(filters));
    
    const params = {
      page_size: 20,
      ordering: filters.ordering,
    };
    
    if (filters.category) {
      params.genres = filters.category;
    }
    
    if (filters.tags.length) {
      params.tags = filters.tags.join(',');
    }
    
    if (filters.year) {
      // RAWG API uses dates for filtering by year
      params.dates = `${filters.year}-01-01,${filters.year}-12-31`;
    }
    
    dispatch(fetchGames(params));
  };

  const resetFilters = () => {
    const defaultFilters = {
      category: '',
      tags: [],
      year: '',
      ordering: '-rating'
    };
    
    setLocalFilters(defaultFilters);
    dispatch(setFilters(defaultFilters));
    dispatch(fetchGames({ page_size: 20, ordering: '-rating' }));
  };

  return (
    <Card className="sidebar">
      <Card.Header>Filters</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select 
              value={filters.category} 
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            {tags.map(tag => (
              <Form.Check 
                key={tag.id}
                type="checkbox"
                id={`tag-${tag.id}`}
                label={tag.name}
                checked={filters.tags.includes(tag.id)}
                onChange={() => handleTagChange(tag.id)}
              />
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Release Year</Form.Label>
            <Form.Select 
              value={filters.year} 
              onChange={handleYearChange}
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sort By</Form.Label>
            <Form.Select 
              value={filters.ordering} 
              onChange={handleOrderingChange}
            >
              <option value="-rating">Popularity (High to Low)</option>
              <option value="rating">Popularity (Low to High)</option>
              <option value="-released">Release Date (Newest)</option>
              <option value="released">Release Date (Oldest)</option>
              <option value="name">Name (A-Z)</option>
              <option value="-name">Name (Z-A)</option>
            </Form.Select>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" onClick={applyFilters}>
              Apply Filters
            </Button>
            <Button variant="outline-secondary" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Sidebar;