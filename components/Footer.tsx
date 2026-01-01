
import React from 'react';
import { SITE_CONFIG } from '../constants';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-800 pb-10">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold text-white mb-4">{SITE_CONFIG.siteName}</h2>
          <p className="text-sm leading-relaxed mb-6">
            {SITE_CONFIG.tagline}. নওগাঁ জেলার মানুষের সুখ-দুঃখের কথা বলতেই আমাদের এই নিরন্তর পথচলা।
          </p>
          <div className="flex space-x-4">
             <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition"><i className="fab fa-facebook-f text-white"></i></a>
             <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition"><i className="fab fa-youtube text-white"></i></a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-red-600 pl-3">বিভাগসমূহ</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/category/district" className="hover:text-white transition">নওগাঁ সংবাদ</Link></li>
            <li><Link to="/category/national" className="hover:text-white transition">জাতীয়</Link></li>
            <li><Link to="/category/politics" className="hover:text-white transition">রাজনীতি</Link></li>
            <li><Link to="/category/economy" className="hover:text-white transition">অর্থনীতি</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-red-600 pl-3">প্রয়োজনীয় লিংক</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition">আমাদের সম্পর্কে</a></li>
            <li><a href="#" className="hover:text-white transition">বিজ্ঞাপন রেট</a></li>
            <li><a href="#" className="hover:text-white transition">যোগাযোগ</a></li>
            <li><a href="#" className="hover:text-white transition">গোপনীয়তা নীতিমালা</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-red-600 pl-3">অফিস</h3>
          <p className="text-sm mb-4">
            শহীদ মিনারের পাশে, সদর রোড, নওগাঁ।
          </p>
          <p className="text-sm">ইমেইল: info@naogaonkonthosor.com</p>
          <p className="text-sm">ফোন: ০১৭০০-০০০০০০</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.siteName} - সর্বস্বত্ব সংরক্ষিত।</p>
      </div>
    </footer>
  );
};

export default Footer;
