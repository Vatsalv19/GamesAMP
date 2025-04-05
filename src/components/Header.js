import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth, UserButton } from '@clerk/clerk-react';
import SearchBar from './SEarchBar';
import '../styles/Header.css';

const Header = () => {
  const { isSignedIn } = useAuth();
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img 
            src="https://static.vecteezy.com/system/resources/thumbnails/017/765/104/small_2x/initial-monogram-letter-g-logo-design-with-luxury-concept-vector.jpg" 
            alt="Game Explorer Logo" 
            className="logo" 
          />
          GamesAMP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <SearchBar />
          <Nav className="ms-auto">
            {isSignedIn ? (
              <>
                <Nav.Link as={Link} to="/library">My Library</Nav.Link>
                <div className="ms-2">
                  <UserButton />
                </div>
              </>
            ) : (
              <Nav.Link as={Link} to="/sign-in">Sign In</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;