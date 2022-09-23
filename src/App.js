import { Routes, Route } from 'react-router-dom'

// Pages
import HomePage from './pages/Home'
import NewMeetupPage from './pages/NewMeetup'
import PredictionPage from './pages/Sports/Prediction'
import AccountsPage from './pages/Banks/Accounts'
import CreditCardsPage from './pages/Banks/CreditCards'

// Components
import Layout from './components/layouts/Layout'

function App () {
  return (
    <Layout>
      <Routes>
        <Route path='/' exact element={<HomePage />} />
        <Route path='/new-meetup' element={<NewMeetupPage />} />
        <Route path='/sports/prediction' element={<PredictionPage />} />
        <Route path='/banks/accounts' element={<AccountsPage />} />
        <Route path='/banks/credit-cards' element={<CreditCardsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
