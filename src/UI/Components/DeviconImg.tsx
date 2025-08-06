import React from 'react';

interface DeviconImgProps {
  languageName: string;
  size?: 'small' | 'medium' | 'large';
}

export const DeviconImg: React.FC<DeviconImgProps> = ({ languageName, size = 'medium' }) => {
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl'
  };

  return (
    <i
      className={`devicon-${languageName}-plain ${sizeClasses[size]} transition-all duration-200 hover:scale-110`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: '1'
      }}
    ></i>
  );
};

export default DeviconImg;