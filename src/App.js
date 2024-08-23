import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AdminDashboard from './Admin/AdminDashboard';
import TeacherList from './components/TeacherList';
import TeacherProfile from './components/TeacherProfile';
import './App.css';
import axios from 'axios';

function App() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const response = await axios.get('https://elearning-backend-gcsf.onrender.com/api/carousel-items');
        setCarouselItems(response.data);
      } catch (error) {
        console.error('Error fetching the carousel items', error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await axios.get('https://elearning-backend-gcsf.onrender.com/api/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching the teachers', error);
      }
    };

    fetchCarouselItems();
    fetchTeachers();
  }, []);

  const groupTeachers = (teachers) => {
    const grouped = [];
    for (let i = 0; i < teachers.length; i += 3) {
      grouped.push(teachers.slice(i, i + 3));
    }
    return grouped;
  };

  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg">
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

                <section id="teachers" className="teachers-section mt-5">
                  <Container>
                    <h2>Our Teachers</h2>
                    <Carousel>
                      {groupTeachers(teachers).map((teacherGroup, index) => (
                        <Carousel.Item key={index}>
                          <div className="row">
                            {teacherGroup.map((teacher) => (
                              <div key={teacher._id} className="col-4">
                                <Link to={`/teacher/${teacher._id}`} className="text-decoration-none">
                                  <div className="card mb-3">
                                    <div className="fixed-image">
                                      {teacher.photo ? (
                                        <img
                                          src={teacher.photo.startsWith('http') ? teacher.photo : `https://elearning-backend-gcsf.onrender.com${teacher.photo}`}
                                          alt={teacher.name}
                                        />
                                      ) : (
                                        <div className="fixed-image-placeholder">No Image</div>
                                      )}
                                    </div>
                                    <div className="card-body">
                                      <h5 className="card-title">{teacher.name}</h5>
                                      <p className="card-text">{teacher.description}</p>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel>
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