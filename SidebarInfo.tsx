
import React from 'react';
import { SITE_CONFIG } from '../constants';

const SidebarInfo: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 p-5 rounded-sm shadow-sm">
      <h3 className="text-xl font-bold border-b-2 border-green-700 pb-2 mb-4">পত্রিকা পরিচিতি</h3>
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <p className="font-bold text-gray-900">সম্পাদক ও প্রকাশক:</p>
          <p>মোঃ আবদুর রহমান</p>
        </div>
        <div>
          <p className="font-bold text-gray-900">নির্বাহী সম্পাদক:</p>
          <p>কামরুল হাসান</p>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <p className="font-bold text-gray-900">অফিস:</p>
          <p>শহীদ মিনার সংলগ্ন, প্রধান সড়ক, নওগাঁ।</p>
        </div>
        <div>
          <p className="font-bold text-gray-900">ফোন:</p>
          <p>০১৭০০-০০০০০০, ০১৮০০-০০০০০০</p>
        </div>
        <div>
          <p className="font-bold text-gray-900">ইমেইল:</p>
          <p className="text-blue-600">info@naogaonkonthosor.com</p>
        </div>
      </div>
      <div className="mt-6">
        <button className="w-full bg-green-700 text-white py-2 rounded-sm font-bold hover:bg-green-800 transition">
          আমাদের সম্পর্কে আরও
        </button>
      </div>
    </div>
  );
};

export default SidebarInfo;
