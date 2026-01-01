
import React from 'react';
import { SITE_CONFIG } from '../constants';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenDrawer }) => {
  // Mock Bengali date info to match reference style
  const today = new Intl.DateTimeFormat('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <header className="bg-white pt-6 pb-4 px-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto relative flex flex-col items-center">
        {/* Left Side Icons */}
        <div className="absolute left-0 top-0 flex items-center space-x-6 text-gray-800">
          <button 
            onClick={onOpenDrawer}
            className="text-2xl hover:text-red-600 transition-colors"
          >
            <i className="fas fa-bars"></i>
          </button>
          <button 
            onClick={onOpenSearch}
            className="text-xl hover:text-red-600 transition-colors"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Center Logo Area */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl md:text-5xl font-bold text-[#006a4e] tracking-tight mb-2">
              {SITE_CONFIG.siteName}
            </h1>
          </Link>
          <div className="text-gray-600 text-sm md:text-base mt-2 flex flex-col items-center font-medium leading-relaxed">
            <p>{today}</p>
            <p className="text-xs text-gray-500">খ্রিস্টাব্দ, ১৭ই পৌষ, ১৪৩২ বঙ্গাব্দ</p>
          </div>
        </div>

        {/* Right Side Social */}
        <div className="absolute right-0 top-0 hidden md:block">
          <a href="#" className="text-4xl text-[#1877F2] hover:opacity-80 transition">
            <i className="fab fa-facebook-circle"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
