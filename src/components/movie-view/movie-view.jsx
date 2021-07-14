import React from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import FigureImage from 'react-bootstrap/FigureImage';
import Figure from 'react-bootstrap/Figure';

export class MovieView extends React.Component {


  render() {
    const { movie, onBackClick } = this.props;
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
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-genre">
              <span className="label">Genre: </span>
              <span className="value">{movie.Genre.Name}</span>
            </div>
            <div className="movie-director">
              <span className="label">Director: </span>
              <span className="value">{movie.Director.Name}</span>
            </div>
            <Button variant='secondary' size='sm' onClick={() => { onBackClick(null); }}>Back</Button>
          </div>
        </Figure>
      </Jumbotron>

    );
  }
}
