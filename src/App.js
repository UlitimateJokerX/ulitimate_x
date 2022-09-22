import { Routes, Route } from 'react-router-dom'

// Pages
import HomePage from './pages/Home'
import NewMeetupPage from './pages/NewMeetup'
import PlaysportPrediction from './pages/PlaysportPrediction'

// Components
import Layout from './components/layouts/Layout'

function App () {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/new-meetup" element={<NewMeetupPage />} />
        <Route path="/playsport-prediction" element={<PlaysportPrediction />} />
      </Routes>
    </Layout>
  )
}

export default App
