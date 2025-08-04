import React from 'react';
import { ProjectRepoDTO } from '../Endpoints/Complex/GetPortfolioRepos';
import DeviconImg from '../Devicon/DeviconImg';

export interface ProjectElementProps {
  project: ProjectRepoDTO;
}

export const ProjectElement: React.FC<ProjectElementProps> = ({ project }) => (
  <div className={`ProjectElement-${project.name}`}>
    {
      project.languages.map((language, index) => (
        <DeviconImg key={index} languageName={language.name} />
      ))
    }
    <h2>{project.name}</h2>
    <p>{project.description}</p>
    {project.images && project.images.length > 0 && (
      <img src={project.images[0]} alt={project.name} />
    )}
    <a href={project.url}>Learn more</a>
    {project.docURL && <a href={project.docURL}>Documentation</a>}
  </div>
);

export default ProjectElement;