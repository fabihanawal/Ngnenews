
export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  district: string;
  upazilaId?: string; // Link to specific upazila
  image: string;
  content: string;
  author: string;
  date: string;
  isLead?: boolean;
  isBreaking?: boolean;
}

export enum Category {
  NATIONAL = 'জাতীয়',
  DISTRICT = 'নওগাঁ সংবাদ',
  POLITICS = 'রাজনীতি',
  ECONOMY = 'অর্থনীতি',
  SPORTS = 'খেলাধুলা',
  ENTERTAINMENT = 'বিনোদন',
  INTERNATIONAL = 'আন্তর্জাতিক',
  EDUCATION = 'শিক্ষা',
  HEALTH = 'স্বাস্থ্য'
}

export interface SiteConfig {
  districtName: string;
  siteName: string;
  tagline: string;
}
