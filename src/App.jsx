import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { RouteTransitionLoader } from './components/RouteTransitionLoader'
import HomePage from './pages/HomePage'
import StartupPartnershipPage from './pages/StartupPartnershipPage'
import AboutUsPage from './pages/AboutUsPage'
import ContactPage from './pages/ContactPage'
import InsightsPage from './pages/InsightsPage'
import ServicesPage from './pages/ServicesPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import BuildSquadPage from './pages/BuildSquadPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteTransitionLoader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/partnership" element={<StartupPartnershipPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/build-squad" element={<BuildSquadPage />} />
      </Routes>
    </BrowserRouter>
  )
}
