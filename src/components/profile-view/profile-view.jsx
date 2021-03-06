import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card'
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';



export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
      Birthday: '',
      Email: '',
      UsernameError: '',
      EmailError: '',
      PasswordError: '',
      BirthdayError: ''
    }
    this.handleUpdate = this.handleUpdate.bind(this);
    this.formValidation = this.formValidation.bind(this);
  }


  handleUpdate(e) {
    e.preventDefault();
    let token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user.Username);

    let setisValid = this.formValidation();

    if (setisValid) {
      axios.put(`https://myflix-app-akornefa.herokuapp.com/users/${user.Username}`, {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday
      },
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(response => {
          const data = response.data;
          localStorage.setItem('user', data.Username);
          this.props.onUpdate(data);
          console.log(data);
          alert(user.Username + 'has been updated');


        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })
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
    if (this.state.Password === '') {
      PasswordError.passwordMissing = 'Password is required';
      isValid = false;
    }
    if (!(this.state.Email && this.state.Email.includes('.') && this.state.Email.includes('@'))) {
      EmailError.emailNotEmail = 'A valid email address is required.';
      isValid = false;
    }
    if (this.state.Birthday === '') {
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

  render() {

    const { user, movies, deleteUser } = this.props;
    const { UsernameError, EmailError, PasswordError, BirthdayError } = this.state;

    return (
      <div>
        <h1>User Information</h1>
        <p>Username: {user.Username}</p>
        <p>Birthday: {user.Birthday}</p>
        <p>Email: {user.Email}</p>

        <Form onSubmit={this.handleUpdate}>
          <h1>Update information</h1>
          <Form.Group className="mb-3" controlId="Username">
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type='text'
              name='Username'
              placeholder='Username'
              value={this.state.Username}
              onChange={(e) => this.handleChange(e)}
            />
            {Object.keys(UsernameError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {UsernameError[key]}
                </div>
              );
            })}
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type='password'
              name='Password'
              placeholder='Password'
              value={this.state.Password}
              onChange={(e) => this.handleChange(e)}
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
              type='email'
              name='Email'
              placeholder='Enter email'
              value={this.state.Email}
              onChange={(e) => this.handleChange(e)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            {Object.keys(EmailError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {EmailError[key]}
                </div>
              );
            })}
          </Form.Group>

          <Form.Group className="mb-3" controlId="Birthday">
            <Form.Label>Birthdate: </Form.Label>
            <Form.Control
              type='text'
              name='Birthday'
              placeholder='00/00/0000'
              value={this.state.Birthday}
              onChange={(e) => this.handleChange(e)}
            />
            {Object.keys(BirthdayError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {BirthdayError[key]}
                </div>
              );
            })}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            block
            size='lg'
          >
            Save Changes
          </Button>
          <Button
            variant="danger"
            type="submit"
            block
            size='lg'
            onClick={() => { deleteUser() }}
          >
            Delete Account
          </Button>
        </Form>
        <br />

        <h1>Favorite Movies: </h1>
        <Row>
          {movies.map(m => (
            <Col md={4} key={m._id}>
              <MovieCard movie={m} />
            </Col>))}
        </Row>
      </div>
    )
  }
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
}