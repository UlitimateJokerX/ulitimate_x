import Layout from './components/layouts/Layout'
import RouteList from './RouteList'
import Login from './pages/Login'
import Session from './Session'

function App () {
  const {session_id, setSession} = Session()

  return (
    <Layout>
    {
      !session_id ?
      <>
        <Login setSession={setSession} />
      </>
      :
      <RouteList />
    }
    </Layout>
  )
}

export default App
