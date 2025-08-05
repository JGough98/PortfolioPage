import React, { useState } from 'react';
import ProjectElement from './ProjectElement';
import { ProjectRepoDTO } from '../Endpoints/Complex/GetPortfolioRepos';

export interface ProjectsProps {
  projects: ProjectRepoDTO[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      {projects.map((project, i) => (
        <ProjectElement
          key={i}
          project={project}
          isExpanded={expandedIndex === i}
          onExpand={() => handleExpand(i)}
        />
      ))}
    </>
  );
};

export default Projects;