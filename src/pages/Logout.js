import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Session from '../Session'

function LogoutPage () {
  const navigate = useNavigate()
  const { deleteSession } = Session()

  useEffect(async () => {
    await deleteSession()

    navigate(-1)
  }, []);

  return <></>
}

export default LogoutPage
