import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Form, Row, Col } from 'react-bootstrap'

// 新增銀行資訊
function handleAdd (funcs) {
  funcs.handleClose(false)
}

// 取得單一銀行詳細資料
async function handleGetBankDetail (code, funcs) {
  await fetch(`/api/bank?code=${code}`)
    .then(r => r.json())
    .then(d => {
      console.log(d)
    })
    .catch(e => {
      alert(`Call omnipotent system error: ${e.message}`)
    })
}

// 新增銀行資訊彈跳視窗
function AddBankModel (props) {
  const show = props.show
  const handleClose = props.handleClose

  return (
    <Modal show={show} onHide={handleClose} backdrop='static' size='lg'>
      <Modal.Header>
        <Modal.Title>Add new bank information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' as={Row}>
            <Form.Label column sm='3' className='text-right'>Bank</Form.Label>
            <Col sm='2'>
              <Form.Control
                type='text'
                placeholder='code'
                // onChange={e => setUsername(e.target.value)}
              />
            </Col>
            <Col sm='5'>
              <Form.Control
                type='text'
                placeholder='bank name'
                // onChange={e => setUsername(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm='3' className='text-right'>Account</Form.Label>
            <Col sm='7'>
              <Form.Control
                type='text'
                placeholder='account no.'
                // onChange={e => setUsername(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={e => handleAdd({handleClose})}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

// 列出銀行資訊
function ShowBankList (props) {
  const [addModalShow, setAddModalShow] = useState(false)

  const handleAddModalShow = () => setAddModalShow(true)
  const handleAddModalClose = () => setAddModalShow(false)

  const banks = props.bankList

  return (
    <>
      <Button variant='secondary' onClick={handleAddModalShow}>New</Button>
      <br /><br />
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>Code</th>
            <th>Bank Name</th>
            <th className='text-center'>Show Detail</th>
          </tr>
        </thead>
        <tbody>
        {
          banks.map((bankInfo, index) => {
            return (
              <tr key={index}>
                <td>{bankInfo.code}</td>
                <td>{bankInfo.name}</td>
                <td className='text-center'>
                  <Button variant='secondary' onClick={e => handleGetBankDetail(bankInfo.code , {setSelectedBank: props.setSelectedBank})}></Button>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </Table>
      <AddBankModel show={addModalShow} handleClose={handleAddModalClose} />
    </>
  )
}

// 列出單一銀行詳細資訊
function ShowBankDetail (props) {
  return (
    <Form.Group className='mb-3' as={Row}>
      <Col sm='12' className='text-center'>
        <h1></h1>
      </Col>
    </Form.Group>
  )
}

/**
 * 銀行頁面
 */
function BankPage () {
  const windowUrl = window.location.search
  const params = new URLSearchParams(windowUrl)

  const [bankList, setBankList] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [selectedBank, setSelectedBank] = useState({})

  // 頁面載入時取得資料
  useEffect(() => {
    getBankList()
  }, [])

  const getBankList = () => {
    fetch('/api/banks')
      .then(r => r.json())
      .then(d => {
        setBankList(d.ret)
        setLoading(false)
      })
      .catch(e => {
        alert(`Call omnipotent system error: ${e.message}`)
        setLoading(false)
      })
  }

  if (isLoading) {
    return <Spinner as='span' variant='info' animation='border' role='status' aria-hidden='true' />
  }

  return (
    <>
      <Form>
        <Form.Group className='mb-3' as={Row}>
          <Col sm='6'>
            <ShowBankList bankList={bankList} setSelectedBank={setSelectedBank} />
          </Col>
          <Col sm='6'>
          {
            !Object.keys(selectedBank).length === 0 ? <></> : <ShowBankDetail />
          }
          </Col>
        </Form.Group>
      </Form>
    </>
  )
}

export default BankPage
