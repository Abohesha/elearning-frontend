import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, Nav, Container, Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AdminDashboard from './Admin/AdminDashboard';
import TeacherList from './components/TeacherList';
import TeacherProfile from './components/TeacherProfile';
import './App.css';
import axios from 'axios';

function App() {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const response = await axios.get('https://elearning-backend-gcsf.onrender.com/api/carousel-items');
        setCarouselItems(response.data);
      } catch (error) {
        console.error('Error fetching the carousel items', error);
      }
    };

    fetchCarouselItems();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <Navbar bg="green" variant="green" expand="lg">
          <Container>
            <Navbar.Brand href="/">E-Learning Platform</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/teachers">
                  <Nav.Link>Teachers</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin">
                  <Nav.Link>Admin</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Carousel */}
                <Carousel className="carousel-container">
                  {carouselItems.map((item) => (
                    <Carousel.Item key={item._id}>
                      <img
                        className="d-block w-100"
                        src={`https://elearning-backend-gcsf.onrender.com${item.imageUrl}`}
                        alt={item.title}
                      />
                      <Carousel.Caption>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>

                {/* Site Description */}
                <section id="about" className="about-section">
                  <Container>
                    <h2>About Our Platform</h2>
                    <p>
                      Our e-learning platform offers a variety of courses across
                      different subjects. Our experienced teachers are here to guide
                      you through interactive lessons, helping you to achieve your
                      educational goals. Whether you're looking to improve your
                      skills or learn something new, we have something for everyone.
                    </p>
                  </Container>
                </section>

                {/* Main Content: Teacher List */}
                <section id="teachers" className="teachers-section">
                  <Container>
                    <h2>Our Teachers</h2>
                    <TeacherList />
                  </Container>
                </section>
              </>
            }
          />
          <Route path="/about" element={
            <section id="about" className="about-section">
              <Container>
                <h2>About Us</h2>
                <p>
                  Welcome to our e-learning platform. We aim to provide top-quality
                  education through an easy-to-use platform. Learn at your own pace
                  from the comfort of your home with our expert instructors.
                </p>
              </Container>
            </section>
          }/>
          <Route path="/teacher/:id" element={<TeacherProfile />} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        <footer className="footer bg-dark text-white">
          <Container>
            <p>© 2024 E-Learning Platform. All rights reserved.</p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;
