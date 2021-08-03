import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import PropTypes from 'prop-types';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [birthdayError, setBirthdayError] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    if (setisValid) {
      axios.post('https://myflix-app-akornefa.herokuapp.com/users/register', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('error registering the user')
        });
      // console.log(username, password, email, birthday);
      // props.onLoggedIn(username);

    };
  }

  const formValidation = () => {

    let usernameError = {};
    let passwordError = {};
    let emailError = {};
    let birthdayError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = "Username is incorrect, Use at least 5 characters.";
      isValid = false;
    }
    if (password === '') {
      passwordError.passwordMissing = "Password is required.";
      isValid = false;
    }
    if (!(email && email.includes('.') && email.includes('@'))) {
      emailError.emailNotEmail = "Email address is incorrect.";
      isValid = false;
    }
    if (birthday === '') {
      birthdayError.birthdayEmpty = "Please enter your birthdate.";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    setBirthdayError(birthdayError);
    return isValid;

  };

  const handleClick = () => {
    props.toggleDisplayRegister();
  }

  return (
    <Form>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
        {Object.keys(usernameError).map((key) => {
          return (
            <div> key={key}
              {usernameError[key]}
            </div>
          );
        })}
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        {Object.keys(passwordError).map((key) => {
          return (
            <div key={key}>
              {passwordError[key]}
            </div>
          );
        })}
      </Form.Group>

      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} />
        <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text>
        {Object.keys(emailError).map((key) => {
          return (
            <div key={key}>
              {emailError[key]}
            </div>
          );
        })}
      </Form.Group>

      <Form.Group>
        <Form.Label>Birthday</Form.Label>
        <Form.Control type='text' placeholder='00/00/0000' value={birthday} onChange={e => setBirthday(e.target.value)} />
        {Object.keys(birthdayError).map((key) => {
          return (
            <div key={key}>
              {birthdayError[key]}
            </div>
          );
        })}
      </Form.Group>

      <Button variant='secondary' type='submit' onClick={handleSubmit}>
        Submit
      </Button>
      <br></br><a onClick={handleClick}>Already a user?</a>
    </Form>

  );
}

RegistrationView.propTypes = {
  toggleDisplayRegister: PropTypes.func.isRequired
}