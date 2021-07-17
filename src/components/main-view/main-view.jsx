import React from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      shouldDisplayRegister: false
    };
    this.toggleDisplayRegister = this.toggleDisplayRegister.bind(this);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflix-app-akornefa.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  toggleDisplayRegister() {
    this.setState({
      shouldDisplayRegister: !this.state.shouldDisplayRegister
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, selectedMovie, user, shouldDisplayRegister } = this.state;
    if (!user && shouldDisplayRegister) return (<Row className='justify-content-md-center'><Col md={8}><RegistrationView toggleDisplayRegister={this.toggleDisplayRegister}
      onLoggedIn={user => this.onLoggedIn(user)} /></Col></Row>);
    if (!user && !shouldDisplayRegister) return (<Row className='justify-content-md-center'><Col md={8}><LoginView toggleDisplayRegister={this.toggleDisplayRegister}
      onLoggedIn={user => this.onLoggedIn(user)} /></Col></Row>);

    if (movies.length === 0) return <div className='main-view' />;



    return (
      <div>
        <Row className='logoutButtonRow'>
          <Col md={{ span: 3, offset: 11 }}>
            <Button className='logoutButton' variant='secondary' size='sm' onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Col>
        </Row>
        <Row className='main-view justify-content-md-center'>


          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map(movie => (
              <Col md={3} key={movie._id}>
                <MovieCard movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
              </Col>
            ))
          }

        </Row>
      </div>
    );

  }
}


