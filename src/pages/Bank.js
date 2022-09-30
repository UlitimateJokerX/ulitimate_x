import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Form, Row, Col } from 'react-bootstrap'
import { Tab, Tabs } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'
import Notification, { notify } from 'react-notify-bootstrap'

import classes from '../css/Bank.module.css'

// 新增銀行資訊
function handleAdd (newBank, funcs) {
  console.log(newBank)

  // funcs.setCode()
  // funcs.setBankName()
  // funcs.setAccountNo()

  // funcs.handleClose()
}

// 取得單一銀行詳細資料
async function handleGetBankDetail (code, funcs) {
  funcs.setDetailLoading(true)

  await fetch(`/api/bank?code=${code}`)
    .then(r => r.json())
    .then(d => {
      if (d.result !== 'ok') {
        throw new Error(d.msg)
      }

      funcs.setSelectedBank(d.ret)
      funcs.setDetailLoading(false)
    })
    .catch(e => {
      notify({
        text: `Call omnipotent system error: ${e.message}`,
        variant: 'danger'
      })

      funcs.setDetailLoading(false)
    })
}

// 新增銀行資訊彈跳視窗
function AddBankModel (props) {
  const show = props.show
  const handleClose = props.handleClose

  const [code, setCode] = useState()
  const [bankName, setBankName] = useState()
  const [accountNo, setAccountNo] = useState()
  const [currency, setCurrency] = useState()
  const [isDigital, setIsDigital] = useState()

  const funcs = {
    handleClose
  }

  const newBank = {
    code: code,
    bank_name: bankName,
    account_no: accountNo,
    currency: currency,
    is_digital: isDigital
  }

  function closeModal () {
    // clear input values
    setCode()
    setBankName()
    setAccountNo()
    setCurrency()
    setIsDigital()

    // close modal
    handleClose()
  }

  return (
    <Modal show={show} onHide={closeModal} backdrop='static' size='lg'>
      <Modal.Header closeButton>
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
                onChange={e => setCode(e.target.value)}
              />
            </Col>
            <Col sm='5'>
              <Form.Control
                type='text'
                placeholder='bank name'
                onChange={e => setBankName(e.target.value)}
              />
            </Col>
            <Col sm='2' />
          </Form.Group>
          <hr />
          <Form.Group className='mb-3' as={Row}>
            <Col sm='12' className='text-center'>
              <h3><Badge bg='secondary' size='xl'>Account Information</Badge></h3>
            </Col>
          </Form.Group>
          <Form.Group className='mb-3' as={Row}>
            <Form.Label column sm='3' className='text-right'>Account</Form.Label>
            <Col sm='4'>
              <Form.Control
                type='text'
                placeholder='account no.'
                onChange={e => setAccountNo(e.target.value)}
              />
            </Col>
            <Col sm='4'>
              <Form.Check
                inline
                label='Traditional'
                name='is-digital'
                type='radio'
                id='is-digital-traditional'
                onClick={e => setIsDigital(false)}
              />
              <Form.Check
                inline
                label='Digital'
                name='is-digital'
                type='radio'
                id='is-digital-digital'
                onClick={e => setIsDigital(true)}
              />
            </Col>
            <Col sm='2' />
          </Form.Group>
          <Form.Group className='mb-3' as={Row}>
            <Form.Label column sm='3' className='text-right'>Currency</Form.Label>
            <Col sm='3'>
              <Form.Check
                inline
                label='TWD'
                name='currency'
                type='radio'
                id='radio-twd'
                value='twd'
                onClick={e => setCurrency(e.target.value)}
              />
              <Form.Check
                inline
                label='Foreign'
                name='currency'
                type='radio'
                id='radio-foreign'
                value='foreign'
                onClick={e => setCurrency(e.target.value)}
              />
            </Col>
            <Form.Label column sm='2' className='text-right'>Card PIN</Form.Label>
            <Col sm='2'>
              <Form.Control
                type='text'
                placeholder=''
                // onChange={e => setCode(e.target.value)}
              />
            </Col>
            <Col sm='2' />
          </Form.Group>
          <Form.Group className='mb-3' as={Row}>
            <Form.Label column sm='3' className='text-right'>Fee Discount</Form.Label>
            <Col sm='1'>
              <Badge bg='info'>Transfer</Badge>
            </Col>
            <Col sm='2'>
              <Form.Control
                type='text'
                // onChange={e => setBankName(e.target.value)}
              />
            </Col>
            <Col sm='1'>
              <Badge bg='warning'>Withdraw</Badge>
            </Col>
            <Col sm='2'>
              <Form.Control
                type='text'
                // onChange={e => setBankName(e.target.value)}
              />
            </Col>
            <Form.Label column sm='3' className='text-left'>(times per month)</Form.Label>
          </Form.Group>
          <Form.Group as={Row} className='text-center'>
            <Col sm='12' className='text-center'>
              <Button variant='info' onClick={e => handleAdd(newBank, funcs)}>
                Save
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
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
                  <Button
                    variant='secondary'
                    onClick={e => handleGetBankDetail(bankInfo.code , {
                      setSelectedBank: props.setSelectedBank,
                      setDetailLoading: props.setDetailLoading
                    })}
                  >
                  </Button>
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
  const bank = props.bankInfo

  if (props.isDetailLoading || Object.keys(bank).length === 0) {
    return (
      <></>
    )
  }

  const accounts = bank.accounts || []

  return (
    <Form.Group className='mb-3' as={Row}>
      <Col sm='12' className='text-center'>
        <h2>
          <Badge bg='secondary'>({bank.code}){bank.name}</Badge>
        </h2>
      </Col>
      <Col sm='12'>
        <Tabs justify variant='tabs' className='mb-3'>
          <Tab eventKey='accounts' title='Accounts'>
          {
            accounts.length === 0 ?
            <Form.Label className='text-primary'>(Null)</Form.Label>
            :
            <ShowAccounts accounts={accounts} />
          }
          </Tab>
          <Tab eventKey='credit-card' title='Credit Card'>
            2
          </Tab>
          <Tab eventKey='stock-fund' title='Stock / Fund'>
            3
          </Tab>
        </Tabs>
      </Col>
    </Form.Group>
  )
}

// 列出帳戶資訊
function ShowAccounts (props) {
  const accounts = props.accounts

  return (
    <>
      {
        accounts.map((account, index) => {
          return (
            <div key={index}>
              <Col sm='12'>
                <Badge pill bg='info' className={classes.vcenter}>Acc No.</Badge>
                {' '}
                <Form.Label>
                  {account.account_no}
                </Form.Label>
                {' '}
                <Form.Label className={classes.vcenter}>
                  <Badge bg={account.is_foreign_currency === '0' ? 'info' : 'light'}>台</Badge>
                  <Badge bg={account.is_foreign_currency === '1' ? 'danger' : 'light'}>外</Badge>
                  <Badge bg={account.is_digital === '0' ? 'success' : 'light'}>實</Badge>
                  <Badge bg={account.is_digital === '1' ? 'primary' : 'light'}>數</Badge>
                </Form.Label>
              </Col>
              <Col sm='12'>
                <Badge pill bg='info' className={classes.vcenter}>Fee Discount</Badge>
                {' '}
                <Form.Label>
                { account.zero_transfer_fee_times === '' ?
                  <Form.Label>X</Form.Label>
                  :
                  <>
                    <Badge bg='light' text='black'>轉</Badge>
                    {` ${account.zero_transfer_fee_times} `}
                    <Badge bg='light' text='black'>提</Badge>
                    {` ${account.zero_withdraw_fee_times} `}
                  </>
                }
                </Form.Label>
              </Col>
              <Col sm='12'>
                <Badge pill bg='info' className={classes.vcenter}>PIN</Badge>
                {' '}
                <Form.Label>
                { account.card_pin === '' ?
                  <Form.Label>X</Form.Label>
                  :
                  <>
                  {account.card_pin}
                  </>
                }
                </Form.Label>
              </Col>
              <Col sm='12'>
                <Badge pill bg='info' className={classes.vcenter}>Web ID</Badge>
                {' '}
                <Form.Label>
                { account.web_id === '' ?
                  <Form.Label>X</Form.Label>
                  :
                  <>
                  {account.web_id}
                  </>
                }
                </Form.Label>
              </Col>
              <Col sm='12'>
                <Badge pill bg='info' className={classes.vcenter}>E-mail</Badge>
                {' '}
                <Form.Label>
                { account.email === '' ?
                  <Form.Label>X</Form.Label>
                  :
                  <>
                  {account.email}
                  </>
                }
                </Form.Label>
              </Col>
              <Col sm='12'>
                <Badge pill bg='info' className={classes.vcenter}>Address</Badge>
                {' '}
                <Form.Label>
                { account.address === '' ?
                  <Form.Label>X</Form.Label>
                  :
                  <>
                  {account.address}
                  </>
                }
                </Form.Label>
              </Col>
              <Col sm='12'>
                <Badge pill bg='info' className={classes.vcenter}>Memo</Badge>
                {' '}
                <Form.Label>
                { account.memo === '' ?
                  <Form.Label>X</Form.Label>
                  :
                  <>
                  {account.memo}
                  </>
                }
                </Form.Label>
              </Col>
              { accounts.length === index + 1 ? <></> : <hr /> }
            </div>
          )
        })
      }
    </>
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
  const [isDetailLoading, setDetailLoading] = useState(false)
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
      <Notification options={{position: 'top'}} />
      <Form>
        <Form.Group className='mb-3' as={Row}>
          <Col sm='6'>
            <ShowBankList bankList={bankList} setSelectedBank={setSelectedBank} setDetailLoading={setDetailLoading} />
          </Col>
          <Col sm='6'>
            { !isDetailLoading ? <></> : <Spinner as='span' variant='info' animation='border' role='status' aria-hidden='true' /> }
            { !Object.keys(selectedBank).length === 0 ? <></> : <ShowBankDetail bankInfo={selectedBank} isDetailLoading={isDetailLoading} /> }
          </Col>
        </Form.Group>
      </Form>
    </>
  )
}

export default BankPage
