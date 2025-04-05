import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GameDetailsPage from './pages/GameDetailsPage';
import LibraryPage from './pages/LibraryPage';
import './styles/App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      
      <Container className="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<GameDetailsPage />} />
          <Route path="/library" element={
            <ProtectedRoute>
              <LibraryPage />
            </ProtectedRoute>
          } />
          <Route path="/sign-in" element={
            <div className="auth-container">
              <h1>Sign In</h1>
              <SignIn routing="path" path="/sign-in" redirectUrl="/" />
            </div>
          } />
          <Route path="/sign-up" element={
            <div className="auth-container">
              <h1>Sign Up</h1>
              <SignUp routing="path" path="/sign-up" redirectUrl="/" />
            </div>
          } />
  
        </Routes>
      </Container>
    </div>
  );
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!isSignedIn) {
    return (
      <div className="auth-container">
        <h1>Sign In Required</h1>
        <p>You need to sign in to access this page.</p>
        <SignIn routing="path" path="/sign-in" redirectUrl="/library" />
      </div>
    );
  }
  
  return children;
};

export default App;