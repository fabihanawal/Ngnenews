
import React, { useState } from 'react';
import { searchNewsGrounded } from '../services/geminiService';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ text: string, sources: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const searchResult = await searchNewsGrounded(query);
    setResult(searchResult);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-75 flex items-start justify-center pt-20 px-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="font-bold text-gray-800">স্মার্ট এআই অনুসন্ধান</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600 text-2xl">&times;</button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
            <input 
              autoFocus
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="নওগাঁ বা যেকোন খবর সম্পর্কে লিখুন..."
              className="flex-grow border-2 border-gray-200 rounded-md px-4 py-2 focus:border-red-600 outline-none transition"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 disabled:bg-gray-400 transition"
            >
              {loading ? 'খোঁজা হচ্ছে...' : 'খুঁজুন'}
            </button>
          </form>

          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            {loading && (
              <div className="flex flex-col items-center py-10">
                <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">গুগল এবং এআই এর মাধ্যমে তথ্য সংগ্রহ করা হচ্ছে...</p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded border border-gray-100">
                   <h3 className="font-bold text-red-600 mb-2">এআই উত্তর:</h3>
                   <div className="prose prose-sm text-gray-800 whitespace-pre-line leading-relaxed">
                     {result.text}
                   </div>
                </div>

                {result.sources.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">তথ্যসূত্রসমূহ:</h3>
                    <div className="space-y-2">
                      {result.sources.map((chunk: any, i: number) => (
                        chunk.web && (
                          <a 
                            key={i} 
                            href={chunk.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block p-3 bg-white border border-gray-100 rounded hover:border-red-200 hover:bg-red-50 transition"
                          >
                            <span className="text-sm font-bold text-blue-700 block line-clamp-1">{chunk.web.title}</span>
                            <span className="text-xs text-gray-500 truncate block">{chunk.web.uri}</span>
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
