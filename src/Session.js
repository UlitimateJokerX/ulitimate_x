import { useState } from 'react'

function Session () {
  const [sessionId, setSession] = useState(sessionStorage.getItem('session-id'))

  // Save Session
  const saveSession = userSessionId => {
    sessionStorage.setItem('session-id', userSessionId)

    setSession(userSessionId)
  }

  // Remove Session
  const deleteSession = () => {
    sessionStorage.removeItem('session-id')

    setSession('')
  }

  return {
    session_id: sessionId,
    setSession: saveSession,
    deleteSession
  }
}

export default Session
