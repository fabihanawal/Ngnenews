
import React, { useEffect, useState } from 'react';
import { getNews } from '../services/newsService';
import { NewsItem, Category } from '../types';
import NewsCard from '../components/NewsCard';
import AdBanner from '../components/AdBanner';
import SidebarInfo from '../components/SidebarInfo';

const Home: React.FC = () => {
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews().then((data) => {
      setAllNews(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-20 text-center text-xl">লোড হচ্ছে...</div>;

  const leadNews = allNews.find(n => n.isLead) || allNews[0];
  const sidebarNews = allNews.filter(n => n.id !== leadNews.id).slice(0, 5);
  const districtNews = allNews.filter(n => n.category === Category.DISTRICT).slice(0, 4);
  const others = allNews.filter(n => n.category !== Category.DISTRICT).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Lead Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <NewsCard news={leadNews} type="large" />
        </div>
        <div className="space-y-6">
          <div className="bg-white p-4 border border-gray-100 shadow-sm rounded-sm">
            <h2 className="text-xl font-bold border-b-2 border-red-600 pb-2 mb-4">সর্বশেষ সংবাদ</h2>
            <div className="space-y-1">
              {sidebarNews.map((news) => (
                <NewsCard key={news.id} news={news} type="horizontal" />
              ))}
            </div>
          </div>
          <AdBanner size="rectangle" />
        </div>
      </div>

      <AdBanner size="leaderboard" className="mb-12" />

      {/* District News Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center border-b-2 border-[#006a4e] mb-6">
          <h2 className="bg-[#006a4e] text-white px-4 py-2 font-bold text-xl">নওগাঁ সংবাদ</h2>
          <a href="#" className="text-sm text-[#006a4e] font-bold hover:underline">সব দেখুন</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {districtNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>

      {/* Video Section Placeholder */}
      <div className="mb-12 bg-black p-8 rounded-sm">
        <div className="border-b border-gray-700 mb-6 pb-2">
          <h2 className="text-white font-bold text-xl flex items-center">
            <i className="fas fa-play-circle mr-3 text-red-600"></i> ভিডিও নিউজ
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="aspect-video bg-gray-800 rounded flex items-center justify-center relative group cursor-pointer overflow-hidden">
             <img src="https://picsum.photos/seed/v1/800/450" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition" alt="" />
             <i className="fas fa-play text-4xl text-white z-10 opacity-80"></i>
             <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black text-white text-sm font-bold">নওগাঁর ঐতিহ্যবাহী পট গান এখন বিলুপ্তির পথে</div>
           </div>
           <div className="aspect-video bg-gray-800 rounded flex items-center justify-center relative group cursor-pointer overflow-hidden">
             <img src="https://picsum.photos/seed/v2/800/450" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition" alt="" />
             <i className="fas fa-play text-4xl text-white z-10 opacity-80"></i>
             <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black text-white text-sm font-bold">পোরশার আম বাজারে বাড়ছে ক্রেতাদের ভিড়</div>
           </div>
           <div className="aspect-video bg-gray-800 rounded flex items-center justify-center relative group cursor-pointer overflow-hidden">
             <img src="https://picsum.photos/seed/v3/800/450" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition" alt="" />
             <i className="fas fa-play text-4xl text-white z-10 opacity-80"></i>
             <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black text-white text-sm font-bold">ছোট যমুনা নদীর পানি বিপৎসীমার উপরে</div>
           </div>
        </div>
      </div>

      {/* Grid of Other News + Sidebar Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="border-b-2 border-red-600 mb-4">
              <h2 className="bg-red-600 text-white px-3 py-1 font-bold inline-block">সারাদেশ</h2>
            </div>
            <div className="space-y-4">
              {others.slice(0, 3).map(news => (
                 <NewsCard key={news.id} news={news} type="horizontal" />
              ))}
            </div>
          </div>
          <div>
            <div className="border-b-2 border-blue-600 mb-4">
              <h2 className="bg-blue-600 text-white px-3 py-1 font-bold inline-block">খেলাধুলা</h2>
            </div>
            <div className="space-y-4">
              {others.slice(3, 6).map(news => (
                 <NewsCard key={news.id} news={news} type="horizontal" />
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <SidebarInfo />
          <AdBanner size="rectangle" />
        </div>
      </div>
      
      <div className="mt-12">
        <AdBanner size="leaderboard" />
      </div>
    </div>
  );
};

export default Home;
