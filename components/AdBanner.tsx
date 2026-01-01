
import React from 'react';

interface AdBannerProps {
  size: 'leaderboard' | 'rectangle' | 'square';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ size, className = "" }) => {
  const sizeStyles = {
    leaderboard: "w-full h-[90px] md:h-[100px]",
    rectangle: "w-full h-[250px]",
    square: "w-full aspect-square"
  };

  const placeholderImages = {
    leaderboard: "https://via.placeholder.com/728x90?text=Google+AdSense+Leaderboard+Ad",
    rectangle: "https://via.placeholder.com/300x250?text=Google+AdSense+Rectangle+Ad",
    square: "https://via.placeholder.com/300x300?text=Google+AdSense+Square+Ad"
  };

  return (
    <div className={`bg-gray-50 border border-gray-200 flex flex-col items-center justify-center overflow-hidden rounded-sm ${sizeStyles[size]} ${className}`}>
      <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">ADVERTISEMENT</span>
      <img 
        src={placeholderImages[size]} 
        alt="Advertisement" 
        className="object-contain max-w-full max-h-full opacity-60 grayscale hover:grayscale-0 transition cursor-pointer" 
      />
    </div>
  );
};

export default AdBanner;
