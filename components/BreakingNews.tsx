
import React, { useEffect, useState } from 'react';
import { getBreakingNews } from '../services/newsService';
import { NewsItem } from '../types';
import { Link } from 'react-router-dom';

const BreakingNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    getBreakingNews().then(setNews);
  }, []);

  if (news.length === 0) return null;

  return (
    <div className="bg-white border-b border-gray-200 py-2 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Label */}
        <div className="shrink-0 bg-red-600 text-white px-3 py-1 font-bold text-sm mr-4 z-10 shadow-sm rounded-sm">
          টপ নিউজ
        </div>
        
        {/* Ticker Container */}
        <div className="flex-grow overflow-hidden relative h-8">
          <div className="marquee-content flex items-center space-x-8 absolute whitespace-nowrap animate-marquee hover:pause">
            {/* First set of news */}
            {news.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}`}
                className="text-gray-800 hover:text-red-600 transition text-sm font-medium flex items-center"
              >
                <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                {item.title}
              </Link>
            ))}
            {/* Duplicate set for seamless loop */}
            {news.map((item) => (
              <Link
                key={`dup-${item.id}`}
                to={`/news/${item.slug}`}
                className="text-gray-800 hover:text-red-600 transition text-sm font-medium flex items-center"
              >
                <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                {item.title}
              </Link>
            ))}
            {/* Triple for wider screens */}
            {news.map((item) => (
              <Link
                key={`dup2-${item.id}`}
                to={`/news/${item.slug}`}
                className="text-gray-800 hover:text-red-600 transition text-sm font-medium flex items-center"
              >
                <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default BreakingNews;
