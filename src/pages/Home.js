import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { Form, Row, Col } from 'react-bootstrap'
import { Tab, Tabs } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'
import Notification, { notify } from 'react-notify-bootstrap'

import classes from '../css/index.css'

async function handleSend (e, username, getMsgList, funcs) {
  const newMessage = document.getElementById('new_message').value

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

// 撈取訊息
async function getMsgList (funcs) {
  await fetch('/api/message')
    .then(r => r.json())
    .then(d => {
      funcs.setMsgList(d.ret)
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

  return (
    <>
      <h1 />
      {
        msgList.map((msg, index) => {
          return (
            <div key={index}>
              <Col sm='12'>
                <Badge pill bg={msg.operator.toLowerCase() == 'jenny' ? 'info' : 'dark'}>{msg.operator}</Badge>
                {' '}{msg.created_at}
                <br />
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

  // 頁面載入時取得資料
  useEffect(() => {
    getMsgList({setMsgList})
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
          <button className="btn btn-outline-primary" type="button" onClick={e => handleSend(e, username, getMsgList, {setMsgList})}>Send</button>
          {/* <button className="btn btn-outline-secondary" type="button" disabled>Img (coming soon ...)</button> */}
        </div>
      </div>

      {/* 顯示訊息區塊 */}
      <Notification options={{position: 'top'}} />
      <Form>
        <Form.Group className='mb-12' as={Row}>
          <Col sm='3' />
          <Col sm='6'>
            <ShowMsgList msgList={msgList} />
          </Col>
          <Col sm='3' />
        </Form.Group>
      </Form>
    </section>
  )
}

export default HomePage
