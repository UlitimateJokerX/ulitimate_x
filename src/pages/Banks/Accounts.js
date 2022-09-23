import { get } from 'jquery';
import React, { useState, useEffect } from 'react';

function AccountsPage () {
  const [accountList, setAccountList] = useState([]);

  // 頁面載入時取得accounts資料
  useEffect(() => {
    getAccountList()
  }, []);

  const getAccountList = () => {
    fetch('/api/banks/accounts')
      .then(r => r.json())
      .then(d => {
        setAccountList(d.ret)
      })
      .catch(e => {
        alert(`Call omnipotent system error: ${e.message}`)
      })
  }

  return (
    <div>
      {
        accountList.map((a, i) => {
          return (
            <h1 key={i}>{a.id},{a.name}</h1>
          )
        })
      }
    </div>
  )
}

export default AccountsPage
