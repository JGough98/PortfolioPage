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
        border: '1px solid black',
        margin: '8px',
        padding: '8px',
        borderRadius: '4px'
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
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.2s ease-in-out',
            cursor: 'pointer',
          }}>
          {project.name}
        </h2>
        <div style={{
          display: 'flex',
          gap: '4px',
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
          marginTop: '12px',
          maxHeight: isExpanded ? '1000px' : '0px',
          overflow: 'hidden',
          opacity: isExpanded ? 1 : 0,
          transition: isExpanded
            ? 'max-height 0.6s ease-in-out, opacity 0.6s ease-in-out'
            : 'max-height 0.2s ease-in-out, opacity 0.2s ease-in-out'
        }}
      >
        <p>{project.description}</p>
        {project.images && project.images.length > 0 && (
          <img src={project.images[0]} alt={project.name} style={{ maxWidth: '100%', height: 'auto' }} />
        )}
        <div style={{ marginTop: '8px' }}>
          <a href={project.url} target="_blank" rel="noopener noreferrer">Learn more</a>
          {project.docURL && (
            <>
              {' | '}
              <a href={project.docURL} target="_blank" rel="noopener noreferrer">Documentation</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModel;