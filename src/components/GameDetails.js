// components/GameDetails.js
import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert, Badge, Card, Carousel, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@clerk/clerk-react';
import { BsBookmark, BsBookmarkFill, BsStarFill } from 'react-icons/bs';
import { addToLibrary, removeFromLibrary } from '../redux/slices/librarySlice';
import { getGameDetails, getGameScreenshots } from '../services/api';
import '../styles/GameDetails.css';

const GameDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { isSignedIn } = useAuth();
  const favorites = useSelector(state => state.library.favorites);
  
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const isFavorite = favorites.some(favorite => favorite.id === parseInt(id));

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        
        // Fetch game details and screenshots in parallel
        const [gameData, screenshotsData] = await Promise.all([
          getGameDetails(id),
          getGameScreenshots(id)
        ]);
        
        setGame(gameData);
        setScreenshots(screenshotsData.results || []);
        setError(null);
      } catch (err) {
        setError('Failed to load game details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [id]);

  const handleToggleFavorite = () => {
    if (!isSignedIn) {
      alert('Please sign in to add games to your library');
      return;
    }

    if (isFavorite) {
      dispatch(removeFromLibrary(parseInt(id)));
    } else {
      dispatch(addToLibrary({
        id: parseInt(id),
        name: game.name,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating
      }));
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" variant="primary" />
        <p>Loading game details...</p>
      </div>
    );
  }

  if (error || !game) {
    return (
      <Alert variant="danger" className="my-3">
        {error || 'Game not found'}
      </Alert>
    );
  }

  return (
    <div className="game-details">

      <div className="game-header">
        <h1>{game.name}</h1>
        
        <div className="game-meta">
          <span className="release-date">
            Released: {game.released ? new Date(game.released).toLocaleDateString() : 'TBA'}
          </span>
          
          <span className="rating">
            <BsStarFill className="star-icon" />
            {game.rating || 'N/A'} ({game.ratings_count || 0} ratings)
          </span>
          

{/* 
          <button 
  className={`favorite-btn ${isFavorite ? 'favorited' : ''}`} 
  onClick={handleToggleFavorite}
>
  {isFavorite ? (
    <>
      <BsBookmarkFill className="animate-pop" /> Saved
    </>
  ) : (
    <>
      <BsBookmark /> Add to Library
    </>
  )}
</button> */}


          <button 
  className={`favorite-btn ${isFavorite ? 'favorited' : ''}`} 
  onClick={handleToggleFavorite}
>
  <BsBookmarkFill className={isFavorite ? 'icon-filled' : 'icon-outline'} /> 
  {isFavorite ? 'Saved' : 'Favorite'}
</button>



        </div>
      </div>
      
      <Row>
        <Col lg={8}>
          {screenshots.length > 0 ? (
            <Carousel className="screenshots-carousel">
              {screenshots.map(screenshot => (
                <Carousel.Item key={screenshot.id}>
                  <img
                    className="d-block w-100"
                    src={screenshot.image}
                    alt={`${game.name} screenshot`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <img
              className="featured-image w-100"
              src={game.background_image || '/placeholder.jpg'}
              alt={game.name}
            />
          )}
          
          <div className="game-description">
            <h2>About</h2>
            <div dangerouslySetInnerHTML={{ __html: game.description }} />
          </div>
        </Col>
        
        <Col lg={4}>
          <Card className="game-info-card">
            <Card.Header>Game Info</Card.Header>
            <Card.Body>
              <div className="info-section">
                <h3>Genres</h3>
                <div className="tags-list">
                  {game.genres?.map(genre => (
                    <Badge key={genre.id} bg="secondary" className="me-1 mb-1">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="info-section">
                <h3>Platforms</h3>
                <div className="tags-list">
                  {game.platforms?.map(platform => (
                    <Badge key={platform.platform.id} bg="dark" className="me-1 mb-1">
                      {platform.platform.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="info-section">
                <h3>Publishers</h3>
                <p>
                  {game.publishers?.map(publisher => publisher.name).join(', ') || 'N/A'}
                </p>
              </div>
              
              <div className="info-section">
                <h3>Developers</h3>
                <p>
                  {game.developers?.map(dev => dev.name).join(', ') || 'N/A'}
                </p>
              </div>
              
              <div className="info-section">
                <h3>Website</h3>
                {game.website ? (
                   <a href={game.website} target="_blank" rel="noopener noreferrer">
                   {game.website}
                 </a>
               ) : (
                 <p>No website available</p>
               )}
             </div>
             
             {game.metacritic && (
               <div className="info-section">
                 <h3>Metacritic Score</h3>
                 <Badge 
                   bg={game.metacritic > 75 ? 'success' : game.metacritic > 50 ? 'warning' : 'danger'}
                   className="metacritic-score"
                 >
                   {game.metacritic}
                 </Badge>
               </div>
             )}
             
             {game.esrb_rating && (
               <div className="info-section">
                 <h3>ESRB Rating</h3>
                 <Badge bg="secondary">{game.esrb_rating.name}</Badge>
               </div>
             )}
             
             {game.tags?.length > 0 && (
               <div className="info-section">
                 <h3>Tags</h3>
                 <div className="tags-list">
                   {game.tags.slice(0, 10).map(tag => (
                     <Badge key={tag.id} bg="info" className="me-1 mb-1">
                       {tag.name}
                     </Badge>
                   ))}
                 </div>
               </div>
             )}
           </Card.Body>
         </Card>
         
         {game.platforms?.some(p => p.requirements) && (
           <Card className="game-info-card mt-3">
             <Card.Header>System Requirements</Card.Header>
             <Card.Body>
               {game.platforms
                 .filter(p => p.requirements && (p.requirements.minimum || p.requirements.recommended))
                 .map(p => (
                   <div key={p.platform.id} className="system-requirements">
                     <h3>{p.platform.name}</h3>
                     
                     {p.requirements.minimum && (
                       <div className="requirements-section">
                         <h4>Minimum:</h4>
                         <p>{p.requirements.minimum}</p>
                       </div>
                     )}
                     
                     {p.requirements.recommended && (
                       <div className="requirements-section">
                         <h4>Recommended:</h4>
                         <p>{p.requirements.recommended}</p>
                       </div>
                     )}
                   </div>
                 ))}
             </Card.Body>
           </Card>
         )}
       </Col>
     </Row>
   </div>
 );
};

export default GameDetails;