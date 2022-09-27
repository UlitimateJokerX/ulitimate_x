import { useState } from 'react'

 function Session () {
  const getSession = () => {
    return sessionStorage.getItem('session-id')
  };

  const [sessionId, setSession] = useState(getSession());

  const saveSession = userSessionId => {
    sessionStorage.setItem('session-id', userSessionId)

    setSession(userSessionId)
  }

  const deleteSession = () => {
    sessionStorage.removeItem('session-id')

    setSession('')
  }

  return {
    setSession: saveSession,
    session_id: sessionId,
    deleteSession
  }
}

export default Session
