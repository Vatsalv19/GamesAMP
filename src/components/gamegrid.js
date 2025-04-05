// components/GameGrid.js
import React, { useEffect } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../redux/slices/gamesSlice';
import GameCard from './GameCard';
import Pagination from './Pagination';
import '../styles/GameGrid.css';

const GameGrid = () => {
  const dispatch = useDispatch();
  const { 
    games, 
    loading, 
    error, 
    filters, 
    currentPage, 
    total, 
    searchQuery 
  } = useSelector(state => state.games);

  useEffect(() => {
    const params = {
      page: currentPage,
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
      params.dates = `${filters.year}-01-01,${filters.year}-12-31`;
    }
    
    if (searchQuery) {
      params.search = searchQuery;
    }
    
    dispatch(fetchGames(params));
  }, [currentPage, filters, searchQuery, dispatch]);

  if (loading && games.length === 0) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-3">
        Error: {error}
      </Alert>
    );
  }

  if (games.length === 0) {
    return (
      <Alert variant="info" className="my-3">
        No games found. Try adjusting your filters or search query.
      </Alert>
    );
  }

  return (
    <div className="game-grid-container">
      <Row className="game-grid">
        {games.map(game => (
          <Col key={game.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <GameCard game={game} />
          </Col>
        ))}
      </Row>
      <Pagination 
        currentPage={currentPage} 
        totalItems={total} 
        itemsPerPage={20} 
      />
    </div>
  );
};

export default GameGrid;