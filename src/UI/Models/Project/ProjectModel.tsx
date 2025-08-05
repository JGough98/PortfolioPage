import React from 'react';
import { ProjectRepoDTO } from '../../../Endpoints/Complex/GetPortfolioRepos';
import DeviconImg from '../../Devicon/DeviconImg';

export interface ProjectElementProps {
  project: ProjectRepoDTO;
  isExpanded: boolean;
  onExpand: () => void;
}

export const ProjectModel: React.FC<ProjectElementProps> = ({ project, isExpanded, onExpand }) => (
  <div 
    className={`ProjectElement-${project.name}`}
    style={{ 
      border: '1px solid black', 
      margin: '8px', 
      padding: '8px', 
      borderRadius: '4px'
    }}
  >
    
    {/* Collapsed State - Always Visible */}
    <div onClick={onExpand} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'} }>
      <h2 style={{ margin: 0 }}>{project.name}</h2>
      <div style={{ display: 'flex', gap: '4px' }}>
        {project.languages && project.languages.map((language, index) => (
          <DeviconImg key={index} languageName={language.name} />
        ))}
      </div>
    </div>

    {/* Expanded State - Only Visible When Expanded */}
    {isExpanded && (
      <div style={{ marginTop: '12px' }}>
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
    )}
  </div>
);

export default ProjectModel;