import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Row, Col } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import classes from '../css/Login.module.css'
import { useEffect, useState } from 'react'

async function handleLogin (e, userInput, funcs) {
  e.preventDefault()

  if (userInput.username === '' || userInput.password === '') {
    return alert('Please check input information.')
  }

  funcs.setLoading(true)

  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userInput)
  }

  await fetch('/api/login', requestOptions)
    .then(r => r.json())
    .then(d => {
      if (d.result !== 'ok') {
        throw new Error(d.msg)
      }

      if (d.result === 'ok' && d.ret.login_result_code !== '1') {
        funcs.setMessage(d.ret.login_result_msg)
        funcs.setLoading(false)

        return
      }

      funcs.setSession(d.ret.session_id)
      funcs.setSessionUsername(d.ret.username)
    })
    .catch(e => {
      alert(`Call omnipotent system error: ${e.message}`)
      funcs.setLoading(false)
    })
}

/**
 * 登入頁面
 */
function LoginPage ({setSession, setSessionUsername}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState()
  const [isLoading, setLoading] = useState(false)
  const [clientIp, setClientIp] = useState('')

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setClientIp(data.ip))
      .catch(error => console.log(error))
  }, [])

  return(
    <Form className={classes.form} onSubmit={e => handleLogin(e, {username, password, client_ip: clientIp}, {setSession, setSessionUsername, setMessage, setLoading})}>
      <Form.Group className='mb-3' as={Row} controlId='formBasicUsername'>
        <Form.Label column sm='3'>Username</Form.Label>
        <Col sm='9'>
          <Form.Control
            type='text'
            placeholder='Enter username'
            onChange={e => setUsername(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group className='mb-3' as={Row} controlId='formBasicPassword'>
        <Form.Label column sm='3'>Password</Form.Label>
        <Col sm='9'>
          <Form.Control
            type='password'
            placeholder='Password'
            autoComplete='off'
            onChange={e => setPassword(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group className='text-center'>
        <Form.Label className='text-danger'>{message}</Form.Label>
      </Form.Group>
      <Form.Group className='text-center'>
      {
        !isLoading ?
        <Button variant='info' type='submit'>Login</Button>
        :
        <Button variant='info' disabled>
          <Spinner as='span' animation='border' role='status' aria-hidden='true' />
        </Button>
      }
      </Form.Group>
    </Form>
  )
}

export default LoginPage
