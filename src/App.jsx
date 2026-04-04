import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StartupPartnershipPage from './pages/StartupPartnershipPage'
import AboutUsPage from './pages/AboutUsPage'
import ContactPage from './pages/ContactPage'
import InsightsPage from './pages/InsightsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/partnership" element={<StartupPartnershipPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}
