import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";



export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: props.user.Username,
      Password: '',
      Email: '',
      Birthday: '',
      FavoriteMovies: [],
      UsernameError: '',
      EmailError: '',
      PasswordError: '',
      BirthdayError: ''
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUsers(accessToken);
  }

  getUsers(token) {
    axios.get('https://myflix-app-akornefa.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          users: response.data
        });
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavorite(movie) {
    const token = localStorage.getItem('token');
    const url = 'https://myflix-app-akornefa.herokuapp.com/users/' + localStorage.getItem('user') + '/movies/'
      + movie._id;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
        alert(movie.Title + ' has been removed from your Favorites.');
      });
  }

  handleDelete() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.delete(`https://myflix-app-akornefa.herokuapp.com/users/${user}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert(user + ' has been deleted.');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.pathname = '/';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate(e) {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    let setisValid = this.formValidation();
    if (setisValid) {
      axios.put(`https://myflix-app-akornefa.herokuapp.com/users/${user.Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((response) => {
          const data = response.data;
          localStorage.setItem('user', data.Username);
          console.log(data);
          alert(user + ' has been updated.');
          console.log(response);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    }
  }

  formValidation() {
    let UsernameError = {};
    let EmailError = {};
    let PasswordError = {};
    let BirthdayError = {};
    let isValid = true;
    if (this.state.Username.trim().length < 5) {
      UsernameError.usernameShort = 'Username is required, must be alphanumeric and should to be at least 5 characters long';
      isValid = false;
    }
    if (this.state.Password.trim()) {
      PasswordError.passwordMissing = 'Password is required';
      isValid = false;
    }
    if (!(this.state.Email && this.state.Email.includes('.') && this.state.Email.includes('@'))) {
      EmailError.emailNotEmail = 'A valid email address is required.';
      isValid = false;
    }
    if (this.state.birthday === '') {
      BirthdayError.birthdayEmpty = 'Please enter your birthday.';
      isValid = false;
    }
    this.setState({
      UsernameError: UsernameError,
      PasswordError: PasswordError,
      EmailError: EmailError,
      BirthdayError: BirthdayError,
    })
    return isValid;
  };

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const { user, movies } = this.props;
    const { UsernameError, EmailError, PasswordError, BirthdayError } = this.state;
    const FavoriteMovieList = movies.filter((movie) => {
      return this.state.FavoriteMovies.includes(movie._id);
    });

    return (
      <div>
        <div className='profile-name'>
          <span className='label'>Username: </span>
          <span className='value'>{user.Username}</span>
        </div>
        <div className='profile-email'>
          <span className='label'>Email: </span>
          <span className='value'>{user.Email}</span>
        </div>
        <div className='profile-birthday'>
          <span className='label'>Birthday: </span>
          <span className='value'>{user.Birthday}</span>
        </div>

        <Form className='justify-content-md-center mb-30'>

          <Form.Group className=" justify-content-md-center mb-3" controlId="formBasicUsername">
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type='text'
              name='Username'
              value={this.state.Username}
              onChange={(e) => this.handleChange(e)}
              placeholder='Change username'
            />
            <Form.Text className="text-muted">
              Username is required and should be at least 5 characters long.
            </Form.Text>
          </Form.Group>
          {Object.keys(UsernameError).map((key) => {
            return (
              <div key={key} style={{ color: "red" }}>
                {UsernameError[key]}
              </div>
            );
          })}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type='password'
              name='password'
              value="{this.state.Password}"
              onChange={(e) => this.handleChange(e)}
              placeholder="Enter your password or Change password"
            />
            {Object.keys(PasswordError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {PasswordError[key]}
                </div>
              );
            })}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address: </Form.Label>
            <Form.Control
              type="text"
              name='Email'
              value={this.state.Email}
              onChange={(e) => this.handleChange(e)}
              placeholder="Change Email"
            />
            {Object.keys(EmailError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {EmailError[key]}
                </div>
              );
            })}
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBirthday">
            <Form.Label>Date of Birth: </Form.Label>
            <Form.Control
              type="date"
              name='Birthday'
              value={this.state.Birthday}
              onChange={(e) => this.handleChange(e)}
              placeholder="Change Birthdate"
            />
            {Object.keys(BirthdayError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {BirthdayError[key]}
                </div>
              );
            })}

          </Form.Group>



          <Link to={`/users/${this.state.Username}`}>
            <Button className="mb-2" variant="dark"
              type="link"
              size="md"
              block
              onClick={(e) => this.handleUpdate(e)}
            >
              Save changes
            </Button>
          </Link>

          <Link to={`/`}>
            <Button className="mb-2"
              variant="primary"
              type="submit"
              size="md"
              block
            >
              Back to Main
            </Button>
          </Link>

          <Button className="mb-2" variant="danger"
            size="md"
            block
            onClick={() => this.handleDelete()}
          >
            Delete Account
          </Button>


        </Form>

        <div
          className="favoriteMovies"
          style={{
            float: "center",
            textAlign: "center",
          }}
        >
          <Card.Text className="mt-200" as='h3'>Favorites:</Card.Text>
          <Row className='mb-20'>
            {FavoriteMovieList.map((movie) => {
              return (
                <Col md={3} key={movie._id}>
                  <div key={movie._id}>
                    <Card className='mb-20'>
                      <Card.Img variant="top" src={movie.ImagePath} />
                      <Card.Body>
                        <Link to={`/movies/${movie._id}`}>
                          <Card.Title as='h6'>{movie.Title}</Card.Title>
                        </Link>
                        <Button className='mb-30' onClick={() => this.removeFavorite(movie)}>Remove</Button>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>

    )
  }

}