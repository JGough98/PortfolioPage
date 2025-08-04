import React from 'react';
import ProjectElement, { ProjectElementProps } from './ProjectElement';
import { ProjectRepoDTO } from '../Endpoints/Complex/GetPortfolioRepos';

export interface ProjectsProps {
  projects: ProjectRepoDTO[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => (
  <>
    {projects.map((project, i) => (
      <ProjectElement
        key={i}
        project={project}
      />
    ))}
  </>
);

export default Projects;