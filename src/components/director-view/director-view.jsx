import React from 'react';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className='director-view'>
        <div className='director-name'>
          <span className='label'>Name: </span>
          <span className='value'>{director.Name}</span>
        </div>

        <div className='director-bio'>
          <span className='label'>Bio: </span>
          <span className='value'>{director.Bio}</span>
        </div>

        <div className='director-birth'>
          <span className='label'>Birth year: </span>
          <span className='value'>{director.Birth}</span>
        </div>
        <Button variant='secondary' size='sm' onClick={() => { onBackClick(null); }}>Back</Button>
      </div>


    );

  }
}