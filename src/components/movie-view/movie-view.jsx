import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Figure from 'react-bootstrap/Figure';


import './movie-view.scss'

export class MovieView extends React.Component {


  render() {
    const { movie, onBackClick, addFavorite, deleteFavorite, user } = this.props;
    const movieInProfile = user.FavoriteMovies.includes(movie._id);
    return (
      <Jumbotron>
        <Figure >
          <div className="movie-view">
            <div className="movie-poster">
              <Figure.Image
                width={486}
                height={720}
                alt="171x180"
                src={movie.ImagePath}
                className='movieImage'

              />
            </div>
            <div className='movie-title'>
              <span className='label'>Title: </span>
              <span className='value'>{movie.Title}</span>
            </div>
            <div className='movie-description'>
              <span className='label'>Description: </span>
              <span className='value'>{movie.Description}</span>
            </div>

            <div className='movie-genre'>
              <span className='label'>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button className='genreButton' variant="link">Genre: </Button>
                </Link>
              </span>
              <span className='value'>{movie.Genre.Name}</span>
            </div>

            <div className='movie-director'>
              <span className='label'>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button className='directorButton' variant="link">Director:</Button>
                </Link>
              </span>
              <span className='value'>{movie.Director.Name}</span>
            </div>

            {movieInProfile ?
              <Button size='md' variant='light' block onClick={() => { deleteFavorite(movie._id) }}> Delete Favorite</Button> :
              <Button size='md' variant='light' block onClick={() => { addFavorite(movie._id) }}>Add To Favorites</Button>
            }
            <br />
            <Button variant='secondary' size='sm' onClick={() => { onBackClick(null); }} block>Back</Button>
          </div>
        </Figure>
      </Jumbotron>

    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape.isRequired,
    Director: PropTypes.shape.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}