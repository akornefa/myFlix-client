import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setMovies, setUser, toggleRegister } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';


import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();

    this.toggleDisplayRegister = this.toggleDisplayRegister.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.onLoggedOut = this.onLoggedOut.bind(this);

  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(JSON.parse(localStorage.getItem('user')))
      // this.setState({
      //   user: JSON.parse(localStorage.getItem('user'))
      // });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflix-app-akornefa.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.props.setMovies(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }


  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user);
    // this.setState({
    //   user: authData.user
    // });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    this.getMovies(authData.token);
  }

  toggleDisplayRegister() {
    this.props.toggleRegister(!false);
    // this.setState({
    //   shouldDisplayRegister: !this.state.shouldDisplayRegister
    // });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser('');
    // this.setState({
    //   user: null
    // });
  }

  addFavorite(movieid) {
    let token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user'));

    axios.put(`https://myflix-app-akornefa.herokuapp.com/users/${user.Username}/movies/${movieid}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response);
        this.onUpdate(response.data)
        const movie = this.props.movies.find((movie) => movie._id === movieid);
        alert(movie.Title + ' has been added to Favorites!')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteFavorite(movieid) {
    let token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user'));

    axios.delete(`https://myflix-app-akornefa.herokuapp.com/users/${user.Username}/movies/${movieid}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.onUpdate(response.data)
        const movie = this.props.movies.find((movie) => movie._id === movieid);
        alert(movie.Title + ' has been deleted.')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteUser() {
    let token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user'));
    axios.delete(`https://myflix-app-akornefa.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        this.onLoggedOut()
        window.open(`/`, '_self');
        alert('Account has been deleted')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onUpdate(data) {
    // localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    this.props.setUser(data);
    // this.setState({
    //   user: data
    // });
  }

  render() {

    let { movies, user, shouldDisplayRegister } = this.props;
    if (!user && shouldDisplayRegister) return (<Row className='justify-content-md-center'><Col md={8}><RegistrationView toggleDisplayRegister={this.toggleDisplayRegister}
      onLoggedIn={user => this.onLoggedIn(user)} /></Col></Row>);
    if (!user && !shouldDisplayRegister) return (<Row className='justify-content-md-center'><Col md={8}><LoginView toggleDisplayRegister={this.toggleDisplayRegister}
      onLoggedIn={user => this.onLoggedIn(user)} /></Col></Row>);

    return (
      <Router>
        <Row className='logoutButtonRow'>
          <Navbar className='order-3'>
            <Navbar.Brand href="/">My Flix!</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <Link to={`/users/${user.Username}`}><span className='value'>{user.Username}</span></Link>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
          <Col md={{ span: 3, offset: 11 }}>
            <Button className='logoutButton' variant='secondary' size='sm' onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Col>
        </Row>

        <Row className='main-view justify-content-md-center'>

          <Route exact path='/' render={() => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />;

            return <MoviesList movies={movies} />;
          }} />

          <Route path="/users/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path='/movies/:movieId' render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}
                addFavorite={this.addFavorite} deleteFavorite={this.deleteFavorite}
                user={user} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>

          }
          } />

          <Route path="/users/:userId" render={() => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <ProfileView onLoggedIn={user => this.onLoggedIn(user)}
                movies={movies.filter((movie) => user.FavoriteMovies.includes(movie._id))} user={user}
                onBackClick={() => history.goBack()} onUpdate={data => this.onUpdate(data)} deleteUser={this.deleteUser} />
            </Col>
          }} />

        </Row>

      </Router>
    );

  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user,
    shouldDisplayRegister: state.shouldDisplayRegister
  }
}

export default connect(mapStateToProps, { setMovies, setUser, toggleRegister })
  (MainView);

MainView.propTypes = {
  movies: PropTypes.array.isRequired,
  shouldDisplayRegister: PropTypes.bool,
  setMovies: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired
};