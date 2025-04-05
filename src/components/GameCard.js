// components/GameCard.js
import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@clerk/clerk-react';
import { addToLibrary, removeFromLibrary } from '../redux/slices/librarySlice';
import { BsBookmark, BsBookmarkFill, BsStar, BsStarFill } from 'react-icons/bs';
import '../styles/GameCard.css';

const GameCard = ({ game }) => {
  const dispatch = useDispatch();
  const { isSignedIn } = useAuth();
  const favorites = useSelector(state => state.library.favorites);
  const isFavorite = favorites.some(favorite => favorite.id === game.id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isSignedIn) {
      alert('Please sign in to add games to your library');
      return;
    }

    if (isFavorite) {
      dispatch(removeFromLibrary(game.id));
    } else {
      dispatch(addToLibrary({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating
      }));
    }
  };

  return (
    <Card className="game-card">
      <Link to={`/game/${game.id}`} className="game-link">
        <div className="image-container">
          <Card.Img 
            variant="top" 
            src={game.background_image || '/placeholder.jpg'} 
            alt={game.name} 
          />
          <div className="overlay">
            <button 
              className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? <BsBookmarkFill /> : <BsBookmark />}
            </button>
          </div>
        </div>
        <Card.Body>
          <Card.Title>{game.name}</Card.Title>
          <div className="game-meta">
            <span className="release-date">
              {game.released ? new Date(game.released).getFullYear() : 'TBA'}
            </span>
            <span className="rating">
              <BsStarFill className="star-icon" />
              {game.rating || 'N/A'}
            </span>
          </div>
          <div className="game-tags">
            {game.genres?.slice(0, 3).map(genre => (
              <Badge key={genre.id} bg="secondary" className="me-1">
                {genre.name}
              </Badge>
            ))}
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default GameCard;