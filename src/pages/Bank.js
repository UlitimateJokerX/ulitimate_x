import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

function ShowBankList (props) {
  const banks = props.bankList

  return (
    <Container>
    {
      banks.map((bankInfo, index) => {
        return (
          <Row key={index}>
            <Col>{bankInfo.code}</Col>
            <Col>{bankInfo.name}</Col>
          </Row>
        )
      })
    }
    </Container>
  )
}

function BankPage () {
  const windowUrl = window.location.search
  const params = new URLSearchParams(windowUrl)

  const [bankList, setBankList] = useState([])
  const [isLoading, setLoading] = useState(true)

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

  return (
    <div>
      <span>
        {!isLoading ? <></> : <Spinner as='span' variant='info' animation='border' role='status' aria-hidden='true' />}
      </span>
      <ShowBankList bankList={bankList} />
    </div>
  )
}

export default BankPage
