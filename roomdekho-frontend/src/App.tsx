import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/common/footer';
import Header from './components/common/header';
import ScrollToTop from './components/common/ScrollToTop';
import LoginModal from './components/ui/LoginModal';
import AboutPage from './pages/About';
import HomePage from './pages/home';
import ListPropertyPage from './pages/ListProperty';
import AdminDashboardPage from './pages/Dashbord';

function App() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  return (
    <BrowserRouter>
      <div className="font-sans bg-white min-h-screen flex flex-col">
        <ScrollToTop />
        <Header openLoginModal={openLoginModal} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/list-property" element={<ListPropertyPage />} />
            <Route path="/dashbord" element={<AdminDashboardPage />} />
          </Routes>
        </main>
        <Footer />
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      </div>
    </BrowserRouter>
  );
}

export default App;

