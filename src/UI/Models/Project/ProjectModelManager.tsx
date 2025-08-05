import React, { useState } from 'react';
import ProjectModel from './ProjectModel';
import { ProjectRepoDTO } from '../../../Scripts/Endpoints/Interpreted/GetPortfolioRepos';

export interface ProjectsProps {
  projects: ProjectRepoDTO[];
}

const ProjectModelManager: React.FC<ProjectsProps> = ({ projects }) => {
  // Track expanded state for each project
  const [expanded, setExpanded] = useState<boolean[]>(() => projects.map(() => false));

  const handleExpand = (index: number) => {
    setExpanded(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <>
      {projects.map((project, i) => (
        <ProjectModel
          key={i}
          project={project}
          isExpanded={expanded[i]}
          onExpand={() => handleExpand(i)}
        />
      ))}
    </>
  );
};

export default ProjectModelManager;