import { Routes, Route } from 'react-router-dom'

// Pages
import AllMeetupsPage from './pages/AllMeetups'
import NewMeetupPage from './pages/NewMeetup'

// Components
import Layout from './components/layouts/Layout'

function App () {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<AllMeetupsPage />} />
        <Route path="/new-meetup" element={<NewMeetupPage />} />
      </Routes>
    </Layout>
  )
}

export default App
