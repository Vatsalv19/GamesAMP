import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import GameGrid from '../components/gamegrid';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Container fluid className="main-content">
        <Row>
          <Col lg={3} md={4} className="sidebar-col">
            <Sidebar />
          </Col>
          <Col lg={9} md={8} className="game-grid-col">
            <GameGrid />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;