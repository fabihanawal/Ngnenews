
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CATEGORIES, UPAZILAS } from '../constants';
import { getPendingNews, submitNews, approveNews, uploadImage } from '../services/newsService';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'submit' | 'pending'>('submit');
  const [pendingNews, setPendingNews] = useState<any[]>([]);
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1].label);
  const [upazila, setUpazila] = useState(UPAZILAS[0].id);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
        fetchPending();
      }
      setLoading(false);
    });
  }, [navigate]);

  const fetchPending = async () => {
    const { data } = await getPendingNews();
    if (data) setPendingNews(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let finalImageUrl = 'https://picsum.photos/800/450';
    
    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) finalImageUrl = uploadedUrl;
    }

    const newsData = {
      title,
      slug: title.toLowerCase().replace(/[^a-zA-Z0-9\u0980-\u09FF]/g, '-').slice(0, 100) + '-' + Date.now(),
      category,
      upazila_id: upazila,
      image_url: finalImageUrl,
      content,
      author_name: user.email,
      author_id: user.id,
      created_at: new Date().toISOString(),
    };

    const { error } = await submitNews(newsData);
    if (!error) {
      alert('সংবাদটি সফলভাবে জমা হয়েছে! এডমিন আপ্রুভ করলে এটি মূল সাইটে দেখা যাবে।');
      setTitle('');
      setContent('');
      setImageFile(null);
      setImagePreview(null);
    } else {
      alert('সংবাদ জমা দিতে ত্রুটি হয়েছে। বাকেট সেটআপ চেক করুন।');
    }
    setIsSubmitting(false);
  };

  const handleApprove = async (id: string) => {
    const { error } = await approveNews(id);
    if (!error) {
      alert('সংবাদটি সফলভাবে প্রকাশিত হয়েছে!');
      fetchPending();
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006a4e]"></div>
  </div>;

  const isAdmin = user?.email === 'admin@naogaonkonthosor.com';

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ড্যাশবোর্ড</h1>
          <p className="text-gray-500 font-medium">স্বাগতম, {user?.email}</p>
        </div>
        <div className="flex bg-white rounded-lg shadow-sm p-1 border border-gray-200">
          <button 
            onClick={() => setActiveTab('submit')}
            className={`px-6 py-2 rounded-md font-bold transition-all duration-200 ${activeTab === 'submit' ? 'bg-[#006a4e] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            সংবাদ সাবমিট
          </button>
          {isAdmin && (
            <button 
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-2 rounded-md font-bold transition-all duration-200 ${activeTab === 'pending' ? 'bg-[#006a4e] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              পেন্ডিং নিউজ ({pendingNews.length})
            </button>
          )}
        </div>
      </div>

      {activeTab === 'submit' ? (
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 md:p-10">
          <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4 flex items-center">
            <span className="w-8 h-8 bg-[#006a4e] text-white rounded-full flex items-center justify-center mr-3 text-sm">
              <i className="fas fa-pen"></i>
            </span>
            সংবাদ রচনা করুন
          </h2>
          <form onSubmit={handleNewsSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-3">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">সংবাদের শিরোনাম</label>
                <input 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#006a4e22] focus:border-[#006a4e] outline-none transition-all text-lg font-bold"
                  placeholder="সংবাদের মূল শিরোনামটি এখানে লিখুন"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">বিভাগ</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#006a4e22] outline-none"
                >
                  {CATEGORIES.map(cat => <option key={cat.id} value={cat.label}>{cat.label}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">উপজেলা</label>
                <select 
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#006a4e22] outline-none"
                >
                  {UPAZILAS.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">সংবাদের ছবি</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-1 hover:border-[#006a4e] transition-colors">
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="py-2 text-center">
                    {imagePreview ? (
                      <img src={imagePreview} className="mx-auto h-20 w-full object-cover rounded" alt="Preview" />
                    ) : (
                      <div className="text-gray-400">
                        <i className="fas fa-cloud-upload-alt text-2xl mb-1"></i>
                        <p className="text-xs">ছবি নির্বাচন করুন</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">বিস্তারিত সংবাদ</label>
                <textarea 
                  required
                  rows={12}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#006a4e22] outline-none resize-none leading-relaxed text-gray-700"
                  placeholder="সংবাদটির বিস্তারিত বর্ণনা এখানে দিন..."
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button 
                disabled={isSubmitting}
                className="bg-[#006a4e] text-white px-12 py-4 rounded-lg font-bold hover:bg-[#005a41] transition shadow-lg disabled:bg-gray-400 flex items-center space-x-3 text-lg"
              >
                {isSubmitting && <i className="fas fa-circle-notch animate-spin"></i>}
                <span>{isSubmitting ? 'প্রসেসিং হচ্ছে...' : 'জমা দিন'}</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingNews.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-xl border-2 border-dashed border-gray-200">
              <i className="fas fa-folder-open text-5xl text-gray-200 mb-4"></i>
              <p className="text-xl text-gray-400 font-bold">কোন পেন্ডিং সংবাদ পাওয়া যায়নি।</p>
            </div>
          ) : (
            pendingNews.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 hover:shadow-md transition-shadow">
                <div className="w-full md:w-64 h-40 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                  <img src={item.image_url} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-[11px] bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider">পেন্ডিং</span>
                      <span className="text-sm font-bold text-[#006a4e]">{item.category}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-sm text-gray-500">{item.upazila_id}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed mb-6">{item.content}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-50 gap-4">
                    <span className="text-sm text-gray-500 font-medium">লেখক: <span className="text-gray-900">{item.author_name}</span></span>
                    <div className="flex space-x-3 w-full sm:w-auto">
                      <button 
                        onClick={() => handleApprove(item.id)}
                        className="flex-grow sm:flex-none bg-green-600 text-white px-8 py-2.5 rounded-lg text-sm font-bold hover:bg-green-700 transition shadow-sm"
                      >
                        আপ্রুভ করুন
                      </button>
                      <button className="flex-grow sm:flex-none bg-red-50 text-red-600 px-8 py-2.5 rounded-lg text-sm font-bold hover:bg-red-100 transition">
                        ডিলিট
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
