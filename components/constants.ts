
import { SiteConfig } from './types';

export const SITE_CONFIG: SiteConfig = {
  districtName: 'নওগাঁ',
  siteName: 'নওগাঁ কণ্ঠস্বর',
  tagline: 'নওগাঁ জেলার নির্ভরযোগ্য অনলাইন সংবাদপত্র'
};

export const UPAZILAS = [
  { id: 'sadar', label: 'নওগাঁ সদর' },
  { id: 'mohadevpur', label: 'মহাদেবপুর' },
  { id: 'manda', label: 'মান্দা' },
  { id: 'niamatpur', label: 'নিয়ামতপুর' },
  { id: 'porsha', label: 'পোরশা' },
  { id: 'sapahar', label: 'সাপাহার' },
  { id: 'patnitala', label: 'পত্নীতলা' },
  { id: 'dhamoirhat', label: 'ধামইরহাট' },
  { id: 'badalgachhi', label: 'বদলগাছী' },
  { id: 'raninagar', label: 'রানীনগর' },
  { id: 'atrai', label: 'আত্রাই' }
];

export const CATEGORIES = [
  { id: 'national', label: 'জাতীয়' },
  { id: 'district', label: 'নওগাঁ সংবাদ', hasSubmenu: true },
  { id: 'politics', label: 'রাজনীতি' },
  { id: 'economy', label: 'অর্থনীতি' },
  { id: 'sports', label: 'খেলাধুলা' },
  { id: 'entertainment', label: 'বিনোদন' },
  { id: 'international', label: 'আন্তর্জাতিক' },
  { id: 'education', label: 'শিক্ষা' },
  { id: 'health', label: 'স্বাস্থ্য' }
];
