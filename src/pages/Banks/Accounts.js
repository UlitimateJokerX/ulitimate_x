import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'

function AccountsPage () {
  const windowUrl = window.location.search
  const params = new URLSearchParams(windowUrl)
  const accNo = params.get('acc_no')

  const [accountList, setAccountList] = useState([])
  const [isLoading, setLoading] = useState(true)

  // 頁面載入時取得accounts資料
  useEffect(() => {
    getAccountList()
  }, [])

  const getAccountList = () => {
    fetch('/api/banks/accounts')
      .then(r => r.json())
      .then(d => {
        setAccountList(d.ret)
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
      {
        accountList.map((a, i) => {
          return (
            <div key={i}>
              <h1>{a.id},{a.name}</h1>
            </div>
          )
        })
      }
    </div>
  )
}

export default AccountsPage
