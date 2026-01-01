
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNews } from '../services/newsService';
import { NewsItem } from '../types';
import NewsCard from '../components/NewsCard';
import { CATEGORIES, UPAZILAS } from '../constants';

const CategoryPage: React.FC = () => {
  const { catId } = useParams<{ catId: string }>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const upazila = UPAZILAS.find(u => u.id === catId);
  const category = CATEGORIES.find(c => c.id === catId);
  
  const categoryLabel = upazila?.label || category?.label || 'বিভাগ';

  useEffect(() => {
    setLoading(true);
    getNews().then(all => {
      let filtered: NewsItem[] = [];
      
      if (upazila) {
        // Filter specifically for the selected Upazila
        filtered = all.filter(item => item.upazilaId === catId);
      } else if (category) {
        // Filter for main category
        filtered = all.filter(item => item.category === category.label);
      }
      
      setNews(filtered);
      setLoading(false);
      window.scrollTo(0, 0);
    });
  }, [catId, upazila, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <div className="border-b-4 border-red-600 mb-8 pb-2">
        <h1 className="text-3xl font-bold text-gray-900">{categoryLabel}</h1>
      </div>

      {loading ? (
        <div className="p-20 text-center text-xl">লোড হচ্ছে...</div>
      ) : news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map(item => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      ) : (
        <div className="p-20 text-center text-gray-500 bg-white border border-dashed rounded-lg">
          <p className="text-lg">দুঃখিত, এই বিভাগে আপাতত কোন সংবাদ নেই।</p>
          <p className="text-sm mt-2">অন্যান্য বিভাগগুলো দেখার জন্য উপরের মেনু ব্যবহার করুন।</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
