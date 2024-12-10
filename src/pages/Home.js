import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'
import Notification, { notify } from 'react-notify-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

import classes from '../css/index.css'

async function handleSend (e, username, funcs) {
  funcs.setLoading(true)

  const newMessage = document.getElementById('new_message').value
  const getMsgList = funcs.getMsgList

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      message: newMessage,
      operator: username
    })
  }

  await fetch('/api/message', requestOptions)
    .then(r => r.json())
    .then(d => {
      if (d.result !== 'ok') {
        throw new Error(d.msg)
      }

      // 清空textarea
      document.getElementById('new_message').value = ''

      // reload
      getMsgList(funcs)
    })
    .catch(e => {
      alert(`Call omnipotent system error: ${e.message}`)
    })
}

async function handleDel (e, msgId, funcs) {
  funcs.setLoading(true)

  const answer = window.confirm('Are you sure you want to delete this message?')
  const getMsgList = funcs.getMsgList

  if (answer) {
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        message_id: msgId,
        new_data: {deleted: 1}
      })
    }

    await fetch('/api/message', requestOptions)
    .then(r => r.json())
    .then(d => {
      if (d.result !== 'ok') {
        throw new Error(d.msg)
      }

      // reload
      getMsgList(funcs)
    })
    .catch(e => {
      alert(`Call omnipotent system error: ${e.message}`)
    })
  }
}

// 撈取訊息
async function getMsgList (funcs) {
  await fetch('/api/message')
    .then(r => r.json())
    .then(d => {
      funcs.setMsgList(d.ret)
      funcs.setLoading(false)
    })
    .catch(e => {
      notify({
        text: `Call omnipotent system error: ${e.message}`,
        variant: 'danger'
      })
    })
}

// 列出訊息列表
function ShowMsgList (props) {
  const msgList = props.msgList
  const loginUser = props.username
  const funcs = props.funcs

  return (
    <>
      <h1 />
      {
        msgList.map((msg, index) => {
          if (msg.deleted == 1) {
            return (
              <div key={index}>
              </div>
            )
          }

          return (
            <div key={index}>
              <Col sm='12'>
                <Badge pill bg={msg.operator.toLowerCase() == 'jenny' ? 'info' : 'dark'}>{msg.operator}</Badge>
                {' '}{msg.created_at}{' '}

                {
                  loginUser.toLowerCase() == msg.operator.toLowerCase() ?
                  <button className="btn btn-outline-secondary border-0" type="button" onClick={e => handleDel(e, msg.id, funcs)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </button>
                  :
                  <></>
                }
                <br />
                {
                  msg.img !== '' ?
                  <div>
                    <a href={msg.img}><img src={msg.img} className='Image' /></a>
                  </div>
                  :
                  <></>
                }
                {
                  <pre>{msg.content}</pre>
                }
                <hr />
              </Col>
            </div>
          )
        })
      }
    </>
  )
}

function HomePage (props) {
  const username = props.username

  const [msgList, setMsgList] = useState([])
  const [isLoading, setLoading] = useState(true)

  // 頁面載入時取得資料
  useEffect(() => {
    getMsgList({setMsgList, setLoading})
  }, [])

  return (
    <section>
      <center>
        {/* <h5>Welcome to Ulitimate X</h5> */}
        <h5>Welcome to SurpriseBear's Message Board</h5>
        <br />
      </center>

      {/* 輸入訊息區塊 */}
      <div className="input-group">
        <textarea id='new_message' className={`${classes.textarea} form-control`} placeholder="I want to say ..." aria-label="message-input" />
        <div className="input-group-append">
          <button className="btn btn-outline-primary" type="button" onClick={e => handleSend(e, username, {getMsgList, setMsgList, setLoading})}>Send</button>
          {/* <button className="btn btn-outline-secondary" type="button" disabled>Img (coming soon ...)</button> */}
        </div>
      </div>

      <br />

      {
        isLoading ?
        <center>
          <Spinner as='span' variant='info' animation='border' role='status' aria-hidden='true' />
        </center>
        :
        <></>
      }

      {/* 顯示訊息區塊 */}
      <Notification options={{position: 'top'}} />
      <Form>
        <Form.Group className='mb-12' as={Row}>
          <Col sm='3' />
          <Col sm='6'>
            <ShowMsgList msgList={msgList} username={username} funcs={{getMsgList, setMsgList, setLoading}} />
          </Col>
          <Col sm='3' />
        </Form.Group>
      </Form>
    </section>
  )
}

export default HomePage
