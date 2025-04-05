
// pages/GameDetailsPage.js
import React from 'react';
import { Container } from 'react-bootstrap';

import GameDetails from '../components/GameDetails';
import '../styles/GameDetailsPage.css';

const GameDetailsPage = () => {
  return (
    <div className="game-details-page">
      
      <Container className="details-container">
        <GameDetails />
      </Container>
    </div>
  );
};

export default GameDetailsPage;