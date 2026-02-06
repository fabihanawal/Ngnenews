
import React from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../types';

interface NewsCardProps {
  news: NewsItem;
  type?: 'large' | 'small' | 'horizontal';
}

const NewsCard: React.FC<NewsCardProps> = ({ news, type = 'small' }) => {
  if (type === 'large') {
    return (
      <Link to={`/news/${news.slug}`} className="group block mb-6">
        <div className="relative overflow-hidden aspect-[16/9] mb-4">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute top-0 left-0 bg-red-600 text-white px-2 py-1 text-xs font-bold">
            {news.category}
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-red-700 transition leading-tight mb-2">
          {news.title}
        </h2>
        <p className="text-gray-600 line-clamp-3 text-base">
          {news.content}
        </p>
      </Link>
    );
  }

  if (type === 'horizontal') {
    return (
      <Link to={`/news/${news.slug}`} className="group flex space-x-4 pb-4 mb-4 border-b border-gray-100 last:border-0">
        <div className="w-1/3 shrink-0 overflow-hidden aspect-[4/3] rounded">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex-grow">
          <h4 className="text-md font-bold text-gray-900 group-hover:text-red-700 transition leading-snug line-clamp-2">
            {news.title}
          </h4>
          <span className="text-xs text-gray-500 mt-1 block">{news.date}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/news/${news.slug}`} className="group block mb-4 pb-4 border-b border-gray-100 md:border-0">
      <div className="relative overflow-hidden aspect-[16/9] mb-3">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute top-0 left-0 bg-[#006a4e] text-white px-2 py-0.5 text-[10px] font-bold">
          {news.category}
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition leading-tight line-clamp-2">
        {news.title}
      </h3>
    </Link>
  );
};

export default NewsCard;
