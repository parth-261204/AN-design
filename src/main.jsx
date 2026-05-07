import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import ProductionHub from './pages/ProductionHub.jsx'
import ProfilePPT from './pages/ProfilePPT.jsx'
import CandleStickGallery from './pages/CandleStickGallery.jsx'
import VotivePdfView from './pages/VotivePdfView.jsx'
import PlantersPdfView from './pages/PlantersPdfView.jsx'
import BowlsPdfView from './pages/BowlsPdfView.jsx'
import ProductDocumentSlideshow from './pages/ProductDocumentSlideshow.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/product/candle-sticks/gallery" element={<CandleStickGallery />} />
        <Route path="/product/votive-planter/pdf-view" element={<VotivePdfView />} />
        <Route path="/product/planters/pdf-view" element={<PlantersPdfView />} />
        <Route path="/product/bowls/pdf-view" element={<BowlsPdfView />} />
        <Route path="/product/:slug/document-view" element={<ProductDocumentSlideshow />} />
        <Route path="/production-hub" element={<ProductionHub />} />
        <Route path="/profile-ppt" element={<ProfilePPT />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
