
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES, UPAZILAS } from '../constants';

interface NavbarProps {
  onOpenSearch: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 overflow-visible">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center py-2 space-x-1 md:space-x-6 overflow-x-auto scrollbar-hide">
          <Link 
            to="/" 
            className={`text-lg font-medium text-gray-800 hover:text-red-600 transition whitespace-nowrap px-2 ${location.pathname === '/' ? 'text-red-600' : ''}`}
          >
            প্রচ্ছদ
          </Link>
          
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="relative group flex items-center">
              <Link
                to={`/category/${cat.id}`}
                className={`text-lg font-medium text-gray-800 hover:text-red-600 transition whitespace-nowrap flex items-center px-2 ${location.pathname === `/category/${cat.id}` ? 'text-red-600' : ''}`}
              >
                {cat.label}
                {cat.hasSubmenu && (
                  <svg className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </Link>

              {cat.hasSubmenu && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white text-gray-800 shadow-2xl hidden group-hover:block border-t-2 border-red-600 z-[60] py-2 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1">
                    {UPAZILAS.map((upazila) => (
                      <Link
                        key={upazila.id}
                        to={`/category/${upazila.id}`}
                        className="block px-4 py-2 hover:bg-gray-100 hover:text-red-700 transition border-b border-gray-50 last:border-0 text-sm"
                      >
                        {upazila.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Mobile search visible on navbar for convenience if needed, or stick to header */}
          <button 
            onClick={onOpenSearch}
            className="md:hidden text-lg text-gray-800 hover:text-red-600 px-2"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
