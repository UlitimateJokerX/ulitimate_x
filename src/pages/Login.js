import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import classes from '../css/Login.module.css'
import { useState } from 'react'

function handleLogin (userInput, setSessionFunc, setMessageFunc) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userInput)
  }

  fetch('/api/login', requestOptions)
    .then(r => r.json())
    .then(d => {
      if (d.result !== 'ok') {
        throw new Error(d.msg)
      }

      if (d.result === 'ok' && d.ret.login_result_code !== '1') {
        return setMessageFunc(d.ret.login_result_msg)
      }

      setSessionFunc(d.ret.session_id)
    })
    .catch(e => {
      alert(`Call omnipotent system error: ${e.message}`)
    })
}

function LoginPage ({setSession}) {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [message, setMessage] = useState()

  return(
    <Form className={classes.form}>
      <Form.Group className='mb-3' controlId='formBasicUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter username'
          onChange={e => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          autoComplete='off'
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Label className='text-danger'>{message}</Form.Label>
      <div className='text-center'>
        <Button variant='primary' onClick={e => handleLogin({username, password}, setSession, setMessage)}>
          Login
        </Button>
      </div>
    </Form>
  )
}

export default LoginPage
