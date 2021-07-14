import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(e);
    console.log(username, password, email, birthday);
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

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} />
        <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Birthday</Form.Label>
        <Form.Control type='text' placeholder='00/00/0000' value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button variant='secondary' type='submit' onClick={handleSubmit}>
        Submit
      </Button>
      <br></br><a onClick={handleClick}>Already a user?</a>
    </Form>

  );
}