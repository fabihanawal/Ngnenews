
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES, SITE_CONFIG } from '../constants';
import { supabase } from '../lib/supabase';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onClose();
    navigate('/');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative w-80 max-w-[80%] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
        <div className="p-4 border-b flex justify-between items-center bg-[#006a4e] text-white">
          <h2 className="font-bold text-xl">{SITE_CONFIG.siteName}</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 space-y-6">
          {/* Auth Section */}
          <div className="bg-gray-50 -mx-4 -mt-4 p-4 mb-4 border-b">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{user.email}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">সংবাদকর্মী</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/dashboard" 
                    onClick={onClose}
                    className="text-sm bg-[#006a4e] text-white py-2 px-3 rounded text-center hover:bg-[#005a41] transition"
                  >
                    ড্যাশবোর্ড
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-sm text-red-600 border border-red-100 py-2 px-3 rounded hover:bg-red-50 transition"
                  >
                    লগ আউট
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-2">
                <p className="text-sm text-gray-600 mb-3">সাংবাদিকদের সংবাদ সাবমিট করতে লগইন করুন</p>
                <Link 
                  to="/login" 
                  onClick={onClose}
                  className="inline-flex items-center justify-center space-x-2 bg-gray-800 text-white py-2 px-6 rounded-full text-sm font-bold hover:bg-black transition"
                >
                  <i className="fas fa-user-lock"></i>
                  <span>লগইন</span>
                </Link>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">বিভাগসমূহ</h3>
            <div className="space-y-3">
              <Link to="/" onClick={onClose} className="block text-gray-800 hover:text-red-600 font-medium">প্রচ্ছদ</Link>
              {CATEGORIES.map(cat => (
                <Link 
                  key={cat.id} 
                  to={`/category/${cat.id}`} 
                  onClick={onClose} 
                  className="block text-gray-800 hover:text-red-600 font-medium"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">পত্রিকা পরিচিতি</h3>
             <div className="text-sm text-gray-600 space-y-2">
                <p><strong>সম্পাদক:</strong> মোঃ আবদুর রহমান</p>
                <p><strong>অফিস:</strong> শহীদ মিনার সংলগ্ন, নওগাঁ।</p>
                <p><strong>ফোন:</strong> ০১৭০০-০০০০০০</p>
             </div>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-around">
            <a href="#" className="text-[#1877F2] text-2xl"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-red-600 text-2xl"><i className="fab fa-youtube"></i></a>
            <a href="#" className="text-blue-400 text-2xl"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
