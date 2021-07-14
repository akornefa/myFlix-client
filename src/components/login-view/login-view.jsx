import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(e);
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleClick = () => {
    props.toggleDisplayRegister();
  }

  return (
    <Form>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant='secondary' type='submit' onClick={handleSubmit}>
        Submit
      </Button>
      <br></br><a onClick={handleClick}>Create an account!</a>
    </Form>

  );
}