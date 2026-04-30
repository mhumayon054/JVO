import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { RouteTransitionLoader } from './components/RouteTransitionLoader'
import { TestimonialsFloatingWidget } from './components/TestimonialsFloatingWidget'
import HomePage from './pages/HomePage'
import StartupPartnershipPage from './pages/StartupPartnershipPage'
import AboutUsPage from './pages/AboutUsPage'
import ContactPage from './pages/ContactPage'
import InsightsPage from './pages/InsightsPage'
import ServicesPage from './pages/ServicesPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import BuildSquadPage from './pages/BuildSquadPage'

function FloatingWidgetGate() {
  const location = useLocation()
  const hideOnRoutes = ['/build-squad']

  if (hideOnRoutes.includes(location.pathname)) return null

  return <TestimonialsFloatingWidget />
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteTransitionLoader />
      <FloatingWidgetGate />
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