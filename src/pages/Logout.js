import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Session from '../Session'

function LogoutPage () {
  const navigate = useNavigate()
  const { deleteSession } = Session()

  useEffect(() => {
    async function deleteSessionFunc () {
      await deleteSession()

      // 登出後回到上一頁
      navigate(-1)
    }

    deleteSessionFunc()
  }, [])

  return <></>
}

export default LogoutPage
