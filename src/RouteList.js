import { Routes, Route } from 'react-router-dom'

// Pages
import LoginPage from './pages/Login'
import LogoutPage from './pages/Logout'
import HomePage from './pages/Home'
import PredictionPage from './pages/Sports/Prediction'
import BankPage from './pages/Bank'

function RouteList () {
  return (
    <Routes>
      {/* 登入畫面 */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/logout' element={<LogoutPage />} />
      {/* 首頁 */}
      <Route path='/' exact element={<HomePage />} />
      {/* 運動相關 */}
      <Route path='/sports/prediction' element={<PredictionPage />} />
      {/* 銀行相關 */}
      <Route path='/bank' element={<BankPage />} />
    </Routes>
  )
}

export default RouteList
