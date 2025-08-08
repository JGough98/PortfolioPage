import React, { useState } from 'react';
import DeviconImg from '../Components/DeviconImg';

export interface FilterProps {
  languages: string[];
  onLanguageToggle: (language: string) => void;
  selectedLanguages: Set<string>;
}

export const LanguageFilter: React.FC<FilterProps> = ({ languages, onLanguageToggle, selectedLanguages }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{
        margin: '8px 0',
        padding: '12px',
        borderRadius: '8px',
        position: 'relative',
        display: 'inline-block',
        background: '#f9f9f9',
        border: '1px solid #e0e0e0',
        borderLeft: '4px solid #333'
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Filter Label */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        whiteSpace: 'nowrap'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '16px',
          color: '#333',
          fontFamily: 'Georgia, serif'
        }}>All Languages</h3>
      </div>

      {/* Expanded Language Options - Positioned to the right */}
      <div
        style={{
          position: 'absolute',
          left: '100%',
          top: '0',
          marginLeft: '8px',
          maxWidth: isExpanded ? '300px' : '0px',
          overflow: 'hidden',
          opacity: isExpanded ? 1 : 0,
          transition: isExpanded
            ? 'max-width 0.3s ease-in-out, opacity 0.3s ease-in-out'
            : 'max-width 0.2s ease-in-out, opacity 0.2s ease-in-out',
          backgroundColor: 'white',
          padding: '12px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: '1px solid #e0e0e0',
          zIndex: 1000
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', minWidth: '200px' }}>
          {languages.map((language, index) => (
            <div
              key={index}
              onClick={() => onLanguageToggle(language)}
              style={{
                cursor: 'pointer',
                opacity: selectedLanguages.has(language) ? 0.3 : 1,
                transition: 'opacity 0.2s ease-in-out',
                padding: '6px',
                borderRadius: '6px',
                border: selectedLanguages.has(language) ? '1px solid #ccc' : '1px solid transparent',
                background: selectedLanguages.has(language) ? '#f0f0f0' : 'transparent'
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

export default LanguageFilter; 