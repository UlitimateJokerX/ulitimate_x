import { Routes, Route } from 'react-router-dom'

// Pages
import HomePage from './pages/Home'
import NewMeetupPage from './pages/NewMeetup'
import SportPrediction from './pages/SportPrediction'

// Components
import Layout from './components/layouts/Layout'

function App () {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/new-meetup" element={<NewMeetupPage />} />
        <Route path="/sport-prediction" element={<SportPrediction />} />
      </Routes>
    </Layout>
  )
}

export default App
