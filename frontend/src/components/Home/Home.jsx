import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Front from './Front'; // Import the front SVG component
import Back from './Back'; // Import the back SVG component
import './Home.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import ClientCard from '../testimonal/ClientCard';
import Hero from '../hero/Hero';

const Home = () => {
  const navigate = useNavigate()

  return (
    <>

      <Container className="container mt-24">
        {/* <button className='w-16 right-3' onClick={handleyoga}>Yoga</button> */}

        <Row className="justify-content-center align-items-center no-gutters rowrow ">

          <Col className="d-flex justify-content-center svg-col">
            <div className="svg-front">
              <Front className="svg-graphic" />
            </div>
          </Col>
          <Col className="d-flex justify-content-center svg-col">
            <div className="svg-back">
              <Back className="svg-graphic" />
            </div>
          </Col>

        </Row>
      </Container>
      {/* <Hero />   wwe shit this at the last of the home page  */}

    </>
  );
};

export default Home;
