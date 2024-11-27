import { useState } from 'react'

function Session () {
  const [sessionId, setSession] = useState(sessionStorage.getItem('session-id'))

  // Save Session
  const saveSession = userSessionId => {
    sessionStorage.setItem('session-id', userSessionId)

    setSession(userSessionId)
  }

  // Set Username
  const setSessionUsername = username => {
    sessionStorage.setItem('username', username)
  }

  // Remove Session
  const deleteSession = () => {
    sessionStorage.removeItem('session-id')
    sessionStorage.removeItem('username')

    setSession('')
  }

  return {
    session_id: sessionId,
    username: sessionStorage.getItem('username'),
    setSession: saveSession,
    setSessionUsername,
    deleteSession
  }
}

export default Session
