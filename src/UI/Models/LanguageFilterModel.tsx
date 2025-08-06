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
        margin: '8px',
        padding: '8px',
        borderRadius: '4px',
        position: 'relative',
        display: 'inline-block'
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
        <h3 style={{ margin: 0 }}>All Languages</h3>
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
          padding: '8px',
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

export default LanguageFilter; 