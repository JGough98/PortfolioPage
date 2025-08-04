import React from 'react';

interface DeviconImgProps
{
  languageName: string;
}

export const DeviconImg: React.FC<DeviconImgProps> = ({ languageName }) => (
  <i className={`devicon-${languageName}-plain`}></i>
);

export default DeviconImg;