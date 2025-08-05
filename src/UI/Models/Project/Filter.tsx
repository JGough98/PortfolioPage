import React, { useState } from 'react';
import DeviconImg from '../../Devicon/DeviconImg';

export interface FilterProps {
  languages: string[];
  onLanguageToggle: (language: string) => void;
  selectedLanguages: Set<string>;
}

export const Filter: React.FC<FilterProps> = ({ languages, onLanguageToggle, selectedLanguages }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      style={{ 
        border: '1px solid black', 
        margin: '8px', 
        padding: '8px', 
        borderRadius: '4px',
        position: 'relative'
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Filter Label */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        cursor: 'pointer'
      }}>
        <h3 style={{ margin: 0 }}>Filter</h3>
        <div style={{ display: 'flex', gap: '4px' }}>
          {languages.slice(0, 4).map((language, index) => (
            <DeviconImg 
              key={index} 
              languageName={language} 
              size="small"
            />
          ))}
        </div>
      </div>

      {/* Expanded Language Options */}
      <div 
        style={{ 
          marginTop: '8px',
          maxHeight: isExpanded ? '200px' : '0px',
          overflow: 'hidden',
          opacity: isExpanded ? 1 : 0,
          transition: isExpanded 
            ? 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out' 
            : 'max-height 0.2s ease-in-out, opacity 0.2s ease-in-out'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {languages.map((language, index) => (
            <div
              key={index}
              onClick={() => onLanguageToggle(language)}
              style={{
                cursor: 'pointer',
                opacity: selectedLanguages.has(language) ? 0.3 : 1,
                transition: 'opacity 0.2s ease-in-out',
                padding: '4px',
                borderRadius: '4px',
                border: selectedLanguages.has(language) ? '1px solid #ccc' : '1px solid transparent'
              }}
            >
              <DeviconImg 
                languageName={language} 
                size="small"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter; 