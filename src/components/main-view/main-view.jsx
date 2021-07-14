import React from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


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
    axios.get('https://myflix-app-akornefa.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  toggleDisplayRegister() {
    this.setState({
      shouldDisplayRegister: !this.state.shouldDisplayRegister
    });
  }

  render() {
    const { movies, selectedMovie, user, shouldDisplayRegister } = this.state;
    if (!user && shouldDisplayRegister) return (<Row className="justify-content-md-center"><Col md={8}><RegistrationView toggleDisplayRegister={this.toggleDisplayRegister}
      onLoggedIn={user => this.onLoggedIn(user)} /></Col></Row>);
    if (!user && !shouldDisplayRegister) return (<Row className="justify-content-md-center"><Col md={8}><LoginView toggleDisplayRegister={this.toggleDisplayRegister}
      onLoggedIn={user => this.onLoggedIn(user)} /></Col></Row>);



    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
            </Col>
          ))
        }
      </Row>
    );
  }
}


