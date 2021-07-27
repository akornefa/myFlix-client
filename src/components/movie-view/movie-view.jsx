import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import Jumbotron from 'react-bootstrap/Jumbotron';
import Figure from 'react-bootstrap/Figure';


import './movie-view.scss'

export class MovieView extends React.Component {


  render() {
    const { movie, onBackClick, addFavorite, deleteFavorite } = this.props;
    return (
      <Jumbotron>
        <Figure>
          <div className="movie-view">
            <div className="movie-poster">
              <Figure.Image
                width={486}
                height={720}
                alt="171x180"
                src={movie.ImagePath}
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
            <Button size='md' variant='light' block onClick={() => { deleteFavorite(movie._id) }}> Delete Favorite</Button>
            <Button size='md' variant='light' block onClick={() => { addFavorite(movie._id) }}>Add To Favorites</Button>

            <br />
            <Button variant='secondary' size='sm' onClick={() => { onBackClick(null); }} block>Back</Button>
          </div>
        </Figure>
      </Jumbotron>

    );
  }
}
