import Layout from './components/layouts/Layout'
import RouteList from './RouteList'
import Login from './pages/Login'
import Session from './Session'

function App () {
  const {session_id, username, setSessionUsername, setSession} = Session()

  return (
    <Layout sessionId={session_id} username={username}>
    {
      !session_id ?
      <Login setSession={setSession} setSessionUsername={setSessionUsername} />
      :
      <RouteList username={username} />
    }
    </Layout>
  )
}

export default App
