
import { NewsItem, Category } from '../types';
import { supabase } from '../lib/supabase';

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'নওগাঁয় আম চাষে বিপ্লব: লক্ষ্যমাত্রা ছাড়িয়ে যাওয়ার আশা',
    slug: 'mango-farming-revolution-naogaon',
    category: Category.DISTRICT,
    district: 'নওগাঁ',
    upazilaId: 'sapahar',
    image: 'https://picsum.photos/seed/mango/800/450',
    content: 'নওগাঁ জেলার আম চাষীরা এবার বাম্পার ফলনের আশা করছেন...',
    author: 'নিজস্ব প্রতিবেদক',
    date: '২০ মে ২০২৪',
    isLead: true,
    isBreaking: true
  }
];

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `news/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('news-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('news-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

export const getNews = async (): Promise<NewsItem[]> => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return mockNews;
    
    return data.map(item => ({
      ...item,
      image: item.image_url,
      date: new Date(item.created_at).toLocaleDateString('bn-BD')
    }));
  } catch (e) {
    return mockNews;
  }
};

export const getNewsByCategory = async (category: string): Promise<NewsItem[]> => {
  const allNews = await getNews();
  return allNews.filter(item => item.category === category);
};

export const getNewsByUpazila = async (upazilaId: string): Promise<NewsItem[]> => {
  const allNews = await getNews();
  return allNews.filter(item => item.upazilaId === upazilaId);
};

export const getNewsBySlug = async (slug: string): Promise<NewsItem | undefined> => {
  const allNews = await getNews();
  return allNews.find(item => item.slug === slug);
};

export const getBreakingNews = async (): Promise<NewsItem[]> => {
  const allNews = await getNews();
  return allNews.filter(item => item.isBreaking);
};

export const submitNews = async (newsData: any) => {
  const { data, error } = await supabase
    .from('news')
    .insert([{ ...newsData, status: 'pending' }]);
  return { data, error };
};

export const approveNews = async (id: string) => {
  const { data, error } = await supabase
    .from('news')
    .update({ status: 'approved' })
    .eq('id', id);
  return { data, error };
};

export const getPendingNews = async () => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('status', 'pending');
  return { data, error };
};
