
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import BreakingNews from './components/BreakingNews';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import CategoryPage from './pages/CategoryPage';
import SearchOverlay from './components/SearchOverlay';
import Drawer from './components/Drawer';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
        <Routes>
          {/* Hide header/navbar on login/dashboard for full focus or keep it? Keeping it for now but simplified */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <>
              <Header onOpenSearch={() => setIsSearchOpen(true)} onOpenDrawer={() => setIsDrawerOpen(true)} />
              <Dashboard />
              <Footer />
            </>
          } />
          <Route path="*" element={
            <>
              <Header onOpenSearch={() => setIsSearchOpen(true)} onOpenDrawer={() => setIsDrawerOpen(true)} />
              <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
              <BreakingNews />
              
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/news/:slug" element={<ArticlePage />} />
                  <Route path="/category/:catId" element={<CategoryPage />} />
                </Routes>
              </main>

              <Footer />
            </>
          } />
        </Routes>

        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      </div>
    </Router>
  );
};

export default App;
