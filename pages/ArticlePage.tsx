
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsBySlug, getNews } from '../services/newsService';
import { getNewsSummary } from '../services/geminiService';
import { NewsItem } from '../types';
import NewsCard from '../components/NewsCard';
import AdBanner from '../components/AdBanner';
import SidebarInfo from '../components/SidebarInfo';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [related, setRelated] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<string | undefined>(undefined);
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    setLoading(true);
    setSummary(undefined);
    if (slug) {
      Promise.all([
        getNewsBySlug(slug),
        getNews()
      ]).then(([foundNews, all]) => {
        setNews(foundNews || null);
        setRelated(all.filter(n => n.slug !== slug).slice(0, 5));
        setLoading(false);
        window.scrollTo(0, 0);
      });
    }
  }, [slug]);

  const handleGenerateSummary = async () => {
    if (!news) return;
    setLoadingSummary(true);
    const aiSummary = await getNewsSummary(news.content);
    setSummary(aiSummary);
    setLoadingSummary(false);
  };

  if (loading) return <div className="p-20 text-center text-xl">লোড হচ্ছে...</div>;
  if (!news) return <div className="p-20 text-center text-xl">সংবাদটি পাওয়া যায়নি।</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <AdBanner size="leaderboard" className="mb-8" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <nav className="text-sm text-gray-500 mb-4 flex space-x-2">
            <Link to="/" className="hover:text-red-600">প্রচ্ছদ</Link>
            <span>/</span>
            <Link to={`/category/${news.category}`} className="hover:text-red-600">{news.category}</Link>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {news.title}
          </h1>

          <div className="flex items-center space-x-4 border-y border-gray-100 py-3 mb-6 text-sm text-gray-600">
            <div className="font-bold text-gray-900">{news.author}</div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div>প্রকাশিত: {news.date}</div>
          </div>

          <div className="mb-8">
            <img src={news.image} alt={news.title} className="w-full rounded shadow-sm mb-4" />
            <p className="text-xs text-gray-500 text-right italic">ছবি: সংগৃহীত</p>
          </div>

          {/* AI Summary Section */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-md shadow-sm">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-blue-800 flex items-center">
                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
                 এক নজরে (AI সংক্ষেপ)
               </h3>
               {!summary && !loadingSummary && (
                 <button 
                   onClick={handleGenerateSummary}
                   className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                 >
                   সংক্ষেপ তৈরি করুন
                 </button>
               )}
            </div>
            {loadingSummary && <p className="text-sm text-blue-600 animate-pulse">AI সংক্ষেপ তৈরি করছে...</p>}
            {summary && (
              <div className="text-blue-900 prose prose-sm max-w-none whitespace-pre-line">
                {summary}
              </div>
            )}
            {!summary && !loadingSummary && <p className="text-sm text-blue-700 italic">এই সংবাদটির একটি দ্রুত সারাংশ পেতে বাটনে ক্লিক করুন।</p>}
          </div>

          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-4 text-lg">
            {news.content.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <AdBanner size="rectangle" className="my-10" />

          <div className="mt-12 flex space-x-4 border-t border-gray-100 pt-8">
             <button className="bg-blue-600 text-white px-6 py-2 rounded-sm font-bold text-sm hover:bg-blue-700 transition flex items-center">
               <i className="fab fa-facebook-f mr-2"></i> ফেসবুক শেয়ার
             </button>
             <button className="bg-red-600 text-white px-6 py-2 rounded-sm font-bold text-sm hover:bg-red-700 transition">
               হোয়াটসঅ্যাপ শেয়ার
             </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           <SidebarInfo />
           
           <div className="bg-gray-50 p-5 border border-gray-100">
              <h3 className="text-xl font-bold border-b-2 border-red-600 pb-2 mb-6">আরও পড়ুন</h3>
              <div className="space-y-2">
                {related.map(item => (
                  <NewsCard key={item.id} news={item} type="horizontal" />
                ))}
              </div>
           </div>

           <AdBanner size="rectangle" />
        </div>
      </div>
      
      <div className="mt-12">
        <AdBanner size="leaderboard" />
      </div>
    </div>
  );
};

export default ArticlePage;
