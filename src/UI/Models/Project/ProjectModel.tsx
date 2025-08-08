import React, { useState } from 'react';
import { ProjectRepoDTO } from '../../../Scripts/Endpoints/Interpreted/GetPortfolioRepos';
import DeviconImg from '../../Components/DeviconImg';

export interface ProjectElementProps {
  project: ProjectRepoDTO;
  isExpanded: boolean;
  onExpand: () => void;
}

export const ProjectModel: React.FC<ProjectElementProps> = ({ project, isExpanded, onExpand }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${ProjectModel.name}-${project.name}`}
      style={{
        border: '1px solid #e0e0e0',
        margin: '12px 0',
        padding: '16px',
        borderRadius: '8px',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease-in-out',
        borderLeft: '4px solid #333'
      }}
    >

      {/* Collapsed State - Always Visible */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'transform 0.2s ease-in-out'
        }}
      >
        <h2
          onClick={onExpand}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            margin: 0,
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform 0.2s ease-in-out',
            cursor: 'pointer',
            color: '#333',
            fontFamily: 'Georgia, serif',
            fontSize: '20px'
          }}>
          {project.name}
        </h2>
        <div style={{
          display: 'flex',
          gap: '6px',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.2s ease-in-out'
        }}>
          {project.languages && project.languages.map((language, index) => (
            <DeviconImg key={index} languageName={language.deviconName} />
          ))}
        </div>
      </div>

      {/* Expanded State - Only Visible When Expanded */}
      <div
        style={{
          marginTop: '16px',
          maxHeight: isExpanded ? '1000px' : '0px',
          overflow: 'hidden',
          opacity: isExpanded ? 1 : 0,
          transition: isExpanded
            ? 'max-height 0.6s ease-in-out, opacity 0.6s ease-in-out'
            : 'max-height 0.2s ease-in-out, opacity 0.2s ease-in-out'
        }}
      >
        <p style={{
          color: '#444',
          lineHeight: '1.6',
          marginBottom: '16px',
          fontFamily: 'Georgia, serif'
        }}>{project.description}</p>
        {project.images && project.images.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <img
              src={project.images[0]}
              alt={project.name}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        )}
        <div style={{
          marginTop: '12px',
          padding: '12px',
          background: '#f9f9f9',
          borderRadius: '6px',
          border: '1px solid #e0e0e0'
        }}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#333',
              textDecoration: 'none',
              fontWeight: 'bold',
              marginRight: '12px'
            }}
          >
            Learn more
          </a>
          {project.docURL && (
            <>
              <a
                href={project.docURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Documentation
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModel;