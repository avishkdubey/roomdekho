import { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/common/footer';
import Header from './components/common/header';
import ScrollToTop from './components/common/ScrollToTop';
import LoginModal from './components/ui/LoginModal';
import ViewProperty from './components/ui/ViewProperty';
import AboutPage from './pages/About';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/home';
import ListPropertyPage from './pages/ListProperty';

function AppContent() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const location = useLocation();
  const hideLayout = location.pathname.startsWith('/dashbord');

  return (
    <div className="font-sans bg-white min-h-screen flex flex-col">
      <ScrollToTop />
      {!hideLayout && <Header openLoginModal={openLoginModal} />}
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/list-property" element={<ListPropertyPage />} />
          <Route path="/dashbord" element={<Dashboard />} />
          <Route path="/view-properties" element={<ViewProperty />} /> {/* ✅ FIXED */}
        </Routes>
      </main>

      {!hideLayout && <Footer />}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
