

import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

import GameCard from '../components/GameCard';
import '../styles/LibraryPage.css';

const LibraryPage = () => {
  const favorites = useSelector(state => state.library.favorites);

  return (
    <div className="library-page">
      <Container className="library-container">
        <SignedIn>
          <h1>My Game Library</h1>
          
          {favorites.length === 0 ? (
            <Alert variant="info" className="mt-4">
              Your library is empty. Add games to your library by clicking the bookmark icon on game cards.
            </Alert>
          ) : (
            <Row className="mt-4">
              {favorites.map(game => (
                <Col key={game.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <GameCard game={game} />
                </Col>
              ))}
            </Row>
          )}
        </SignedIn>
        
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </Container>
    </div>
  );
};

export default LibraryPage;