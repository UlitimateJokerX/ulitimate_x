import { Routes, Route } from 'react-router-dom'

// Pages
import HomePage from './pages/Home'
import NewMeetupPage from './pages/NewMeetup'
import PredictionPage from './pages/Sports/Prediction'
import BankPage from './pages/Bank'

function RouteList () {
  return (
    <Routes>
      {/* 首頁 */}
      <Route path='/' exact element={<HomePage />} />
      {/* 待刪除 */}
      <Route path='/new-meetup' element={<NewMeetupPage />} />
      {/* 運動相關 */}
      <Route path='/sports/prediction' element={<PredictionPage />} />
      {/* 銀行相關 */}
      <Route path='/bank' element={<BankPage />} />
    </Routes>
  )
}

export default RouteList
